export default {
    props: ['id'],
    data() {
        return {
            userVerified: false,
            formData: {
                title: "",
                body: "",
                draft: true,
            },
            isEditing: false,
        }
    },
    async created() {
        if ( this.id ) {
            this.isEditing = true;
            const res = await fetch(`/api/blogs/${this.id}`);
            if (res.ok) {
                const blog = await res.json();
                this.formData.title = blog.title;
                this.formData.body = blog.body;
                this.formData.draft = blog.status === "draft";
            } else {
                alert("Failed to fetch blog data!");
            }
        }

    },
    methods: {
        async createUpdatePost(event) {
            event.preventDefault();

            let requestBody = {
                title: this.formData.title,
                body: this.formData.body,
                status: this.formData.draft ? "draft" : "published"
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
                alert(`Post ${this.isEditing ? 'updated' : 'created'} successfully!`);
                this.$router.push('/');
            }
            else {
                alert(`Failed to ${this.isEditing ? 'update' : 'create'} post!`);
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
                <div class="form-switch">
                    <p class="switch-visible-label">Draft</p>
                    <div class="switch">
                        <input type="checkbox" id="draft" class="switch-input" name="draft" v-model="formData.draft" />
                        <label for="draft" class="switch-label">Draft</label>
                    </div>
                </div>
                <div class="btn-group">
                    <button type="button" class="btn btn-secondary btn-wide" @click="$router.push('/')">Cancel</button>
                    <button type="submit" class="btn btn-accent btn-wide">{{ isEditing ? 'Update' : 'Post' }}</button>
                </div>
            </form>
        </div>`
}