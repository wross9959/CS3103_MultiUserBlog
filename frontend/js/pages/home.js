import BlogCard from '/static/js/components/blog-card.js'
import Feature from '/static/js/components/feature.js'

export default {
    components: {
        BlogCard,
        Feature
    },
    data() {
        return {
            posts: [
                { id: 1, title: "Post 1", body: "This is the first post", created_at: "2021-01-01", image: "/static/images/banners/banner-1.jpg" },
                { id: 2, title: "Post 2", body: "This is the second post", created_at: "2021-01-02", image: "/static/images/banners/banner-2.jpg" },
                { id: 3, title: "Post 3", body: "This is the third post", created_at: "2021-01-03", image: "/static/images/banners/banner-3.jpg" },
                { id: 4, title: "Post 4", body: "This is the fourth post", created_at: "2021-01-04", image: "/static/images/banners/banner-4.jpg" },
                { id: 5, title: "Post 5", body: "This is the fifth post", created_at: "2021-01-05", image: "/static/images/banners/banner-5.jpg" },
                { id: 6, title: "Post 6", body: "This is the sixth post", created_at: "2021-01-06", image: "/static/images/banners/banner-6.jpg" },
                { id: 7, title: "Post 7", body: "This is the seventh post", created_at: "2021-01-07", image: "/static/images/banners/banner-7.jpg" },
                { id: 8, title: "Post 8", body: "This is the eighth post", created_at: "2021-01-08", image: "/static/images/banners/banner-8.jpg" },
                { id: 9, title: "Post 9", body: "This is the ninth post", created_at: "2021-01-09", image: "/static/images/banners/banner-9.jpg" },
                { id: 10, title: "Post 10", body: "This is the tenth post", created_at: "2021-01-10", image: "/static/images/banners/banner-10.jpg" },
            ],
            featured: { id: 7, title: "Post 7", body: "This is the seventh post", created_at: "2021-01-07", image: "/static/images/banners/banner-7.jpg" },
        }
    },
    mounted() {
        // fetch('/api/blogs')
        //     .then(response => response.json())
        //     .then(data => {
        //         this.posts = data

        //         this.posts.forEach(post => {
        //             post.created_at = new Date(post.created_at).toLocaleDateString()

        //             // Randomly select a banner image - maybe this should be done on the backend
        //             post.image = `/static/images/banners/banner-${Math.floor(Math.random() * 10) + 1}.jpg`
        //         })

        //         this.featured = this.posts[Math.floor(Math.random() * this.posts.length)]
        //     })
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