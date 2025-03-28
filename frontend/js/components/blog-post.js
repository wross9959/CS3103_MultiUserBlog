export default {
    props: ['id'],
    data() {
        return {
            post: null
        }
    },
    methods: {
        formatBlog(text) {
            return text.split('\n').map(p => `<p>${p}</p>`).join('');
        }
    },
    created() {
        fetch(`/api/blogs/${this.id}`)
            .then(response => response.json())
            .then(data => {
                this.post = data
                this.post.created_at = new Date(this.post.created_at).toLocaleDateString()
                this.post.image = this.post.image_url ||`/static/images/banners/banner-${Math.floor(Math.random() * 10) + 1}.jpg`;
                
                fetch(`/api/users/${this.post.user_id}`)
                    .then(response => response.json())
                    .then(data => {
                        this.post.username = data.username;
                    });
            })
    },
    template: `
    <div class="post container" v-if="post">
        <div class="post-banner">
            <img :src="post.image" alt="Post Banner">
        </div>
        <div class="post-header">
            <h1>{{ post.title }}</h1>
            <p>{{ post.created_at }}</p>
            <p>
            <router-link :to="{ name: 'profile', params: { user_id: post.user_id } }" class="author-link">
                {{ post.username }}
            </router-link>
            </p>
        </div>
        <div class="post-content" v-html="formatBlog(post.body)"></div>
    </div>`
}