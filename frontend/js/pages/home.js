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
            allPosts: [],
        }
    },
    watch: {
        '$route.query': {
            immediate: true,
            handler(newQuery) {
            this.filterPosts(newQuery);
            }
        }
    },
    async created() {

        try {
            const res = await fetch('/api/blogs');
            const data = await res.json();

            let usernames = {};

            data.forEach(post => {
                post.created_at = new Date(post.created_at).toLocaleDateString();
                post.image = post.image_url || `/static/images/banners/banner-${Math.floor(Math.random() * 10) + 1}.jpg`;
                post.username = 'Loading...';

                if (!usernames[post.user_id]) {
                    fetch(`/api/users/${post.user_id}`)
                        .then(response => response.json())
                        .then(data => {
                            usernames[post.user_id] = data.username;
                            post.username = data.username;
                        });
                }
                else {
                    post.username = usernames[post.user_id];
                }
            });

            this.allPosts = data;
            this.filterPosts(this.$route.query);

            if (this.posts.length > 0) {
                this.featured = this.posts[Math.floor(Math.random() * this.posts.length)];
            }
        }
        catch (e) {
            console.error('Error fetching data:', e);
        }
    },
    methods: {
        filterPosts(query) {
            const search = (query.search || "").toLowerCase();
            const category = query.category;
            const user = query.user;

            this.posts = this.allPosts.filter(post => {
                const matchesSearch =
                    !search ||
                    post.title.toLowerCase().includes(search) ||
                    (post.content || "").toLowerCase().includes(search) ||
                    post.username.toLowerCase().includes(search);

                const matchesCategory =
                    !category || post.category_name === category;

                const matchesUser =
                    !user || post.username === user;

                return matchesSearch && matchesCategory && matchesUser;
            });
        }
    },
    template: `
        <div class="container">
            <feature v-if="featured && featured.id" :post="featured"></feature>

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