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

            const userIds = [...new Set(data.map(post => post.user_id))];
            const userFetches = userIds.map(id =>
                fetch(`/api/users/${id}`).then(res => res.json().then(user => ({ id, username: user.username })))
            );

            const userResults = await Promise.all(userFetches);
            const usernameMap = Object.fromEntries(userResults.map(u => [u.id, u.username]));


            const enrichedPosts = data.map(post => ({
                ...post,
                created_at: new Date(post.created_at).toLocaleDateString(),
                image: post.image_url || `/static/images/banners/banner-${Math.floor(Math.random() * 10) + 1}.jpg`,
                username: usernameMap[post.user_id] || 'Unknown'
            }));
    
            this.allPosts = enrichedPosts;
            this.filterPosts(this.$route.query);
            this.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    
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
            <feature v-if="featured" :post="featured"></feature>

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