export default {
    data() {
        return {
            userVerified: false,
            formData: {
                title: "",
                body: "",
                draft: true,
            }
        }
    },
    methods: {
        async createPost(event) {
            event.preventDefault();

            let requestBody = {
                title: this.formData.title,
                body: this.formData.body,
                status: this.formData.draft ? "draft" : "published"
            }

            const response = await fetch('/api/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody) 
            });

            if (response.ok) {
                alert("Post created successfully!");
                this.$router.push('/');
            }
            else {
                alert("Failed to create post!");
            }
        }
    },
    template: `
        <div class="container">
            <h1>Create Post</h1>
            <form id="create-post-form" @submit="createPost">
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
                    <button type="submit" class="btn btn-accent btn-wide">Post</button>
                </div>
            </form>
        </div>`
}