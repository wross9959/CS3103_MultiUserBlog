import BlogCard from '/static/js/components/blog-card.js'
import Feature from '/static/js/components/feature.js'

export default {
    components: {
        BlogCard,
        Feature
    },
    data() {
        return {
            posts: [],
            featured: {},
        }
    },
    created() {
        fetch('/api/blogs')
            .then(response => response.json())
            .then(data => {
                this.posts = data;

                this.posts.forEach(post => {
                    post.created_at = new Date(post.created_at).toLocaleDateString();

                    // Randomly select a banner image - maybe this should be done on the backend
                    post.image = `/static/images/banners/banner-${Math.floor(Math.random() * 10) + 1}.jpg`;
                })

                this.featured = this.posts[Math.floor(Math.random() * this.posts.length)];
            });
    },
    template: `
        <div class="container">
            <feature :post="featured"></feature>

            <div class="content">
                <h1>Recent Posts</h1>
                <div class="post-cards">
                    <div class="post-card" v-for="post in posts">
                        <blog-card :post="post"></blog-card>
                    </div>
                </div>
            </div>
        </div>`
}