export default {
    props: ['id'],
    data() {
        return {
            userVerified: false,
            formData: {
                title: "",
                body: "",
                draft: true,
                image_url: "",
                category: 1,
            },
            isEditing: false,
            categories: [],
        }
    },
    async created() {
        if (this.id) {
            this.isEditing = true;
            const res = await fetch(`/api/blogs/${this.id}`);
            if (res.ok) {
                const blog = await res.json();
                this.formData.title = blog.title;
                this.formData.body = blog.body;
                this.formData.draft = blog.status === "draft";
                this.formData.image_url = blog.image_url || "";
                this.formData.category = blog.category_id;
            } else {
                alert("Failed to fetch blog data!");
            }
        }

        await this.fetchCategories();
    },
    methods: {
        async createUpdatePost(event) {
            event.preventDefault();

            let requestBody = {
                title: this.formData.title,
                body: this.formData.body,
                status: this.formData.draft ? "draft" : "published",
                image_url: this.formData.image_url || "",
                category_id: this.formData.category
            }

            // Allow for put or post methods
            let url = '/api/blogs';
            let method = 'POST';


            // If we are editing a post will add the id on the url and update method
            if (this.isEditing) {
                url = `/api/blogs/${this.id}`;
                method = 'PUT';
            }


            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                Toastify({
                    text: `Post ${this.isEditing ? 'updated' : 'created'} successfully!`,
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "center",
                    stopOnFocus: true,
                    style: {
                        background: "#28a745",
                        boxShadow: "0.3rem 0.3rem 0.2rem rgba(0, 0, 0, 0.1)"
                    }
                }).showToast();
                this.$router.push('/');
            }
            else {
                Toastify({
                    text: `Failed to ${this.isEditing ? 'update' : 'create'} post!`,
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "center",
                    stopOnFocus: true,
                    style: {
                        background: "#dc3545",
                        boxShadow: "0.3rem 0.3rem 0.2rem rgba(0, 0, 0, 0.1)"
                    }
                }).showToast();
            }
        },
        async fetchCategories() {
            const res = await fetch('/api/categories');
            if (res.ok) {
                this.categories = await res.json();
                if (!this.isEditing && this.categories.length > 0) {
                    this.formData.category = this.categories[0].id;
                }
                
            } else {
                console.warn("Failed to fetch categories!");
            }
        }
    },
    template: `
        <div class="container">
            <h1>{{ isEditing ? 'Edit Post' : 'Create Post' }}</h1>
            <form id="create-post-form" @submit="createUpdatePost">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" class="form-control" id="title" name="title" v-model="formData.title" placeholder="Title...">
                </div>
                <div class="form-group">
                    <label for="body">Body</label>
                    <textarea class="form-control" id="body" name="body" v-model="formData.body" placeholder="Write something..."></textarea>
                </div>
                <div class="flex-h align-l">
                    <div class="form-group">
                        <label for="category">Category</label>
                            <select class="form-control" id="category" name="category" v-model="formData.category">                            
                            <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
                        </select>
                    </div>
                    <div class="form-group" style="flex-grow: 1;">
                        <label for="image_url">Cover Image URL (optional)</label>
                        <input type="text" class="form-control" id="image_url" v-model="formData.image_url" placeholder="https://example.com/image.jpg" />
                        <img :src="formData.image_url" style="max-width: 100%; max-height: 200px;">
                    </div>
                </div>
                <div class="form-switch">
                    <p class="switch-visible-label">Draft</p>
                    <div class="switch">
                        <input type="checkbox" id="draft" class="switch-input" name="draft" v-model="formData.draft" />
                        <label for="draft" class="switch-label">Draft</label>
                    </div>
                </div>
                <div class="flex-h align-r">
                    <button type="button" class="btn btn-secondary btn-wide" @click="$router.push('/')">Cancel</button>
                    <button type="submit" class="btn btn-success btn-wide">{{ isEditing ? 'Update' : 'Post' }}</button>
                </div>
            </form>
        </div>`
}