import BlogCard from '/static/js/components/blog-card.js'

export default {
    components: {
        BlogCard
    },
    data() {
        return {
            user: {},
            blogs: [],
            followers: [],
            following: [],
        }
    },

    async created() {
        try {
            const userRes = await fetch('/api/users/me');
            if (!userRes.ok) throw new Error('Could not fetch user');
            const userData = await userRes.json();
            this.user = userData.user;
            console.log('User data:', userData.user);

            const blogRes = await fetch(`/api/users/${userData.user.user_id}/blogs`);
            const blogData = await blogRes.json();
            this.blogs = blogData;

            this.blogs = blogData.map(blog => {
                if (!blog.image) {
                    blog.image = blog.image_url ||`/static/images/banners/banner-${Math.floor(Math.random() * 10) + 1}.jpg`;
                }
                return blog;
            });
            
            

            const followersRes = await fetch(`/api/users/${userData.user.user_id}/followers`);
            const followersData = await followersRes.json();
            this.followers = followersData;

            const followingRes = await fetch(`/api/users/${userData.user.user_id}/follows`);
            const followingData = await followingRes.json();
            this.following = followingData;
            
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    },
    methods: {
        async deleteBlog(blogId) {
            if (!confirm('Are you sure you want to delete this blog?')) return;

            const res = await fetch(`/api/blogs/${blogId}`, { method: 'DELETE' });
            if (res.ok) {
                this.blogs = this.blogs.filter(b => b.id !== blogId);
                Toastify({
                    text: "Blog deleted successfully",
                    duration: 3000,
                    gravity: "top",
                    position: "center",
                    style: { background: "#28a745" }
                  }).showToast();
            } 
            else {
                Toastify({
                    text: "Failed to delete blog",
                    duration: 3000,
                    gravity: "top",
                    position: "center",
                    style: { background: "#dc3545" }
                }).showToast();
            }
        },
        editBlog(blogId) {
            this.$router.push({ name: 'edit', params: { id: blogId } });
        }
    },
    template: `
    <div class="container">
      <div class="content">
        <h1>{{ user.username }}'s Profile</h1>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p>Followers: {{ followers.length }} | Following: {{ following.length }}</p>

        <hr style="margin: 1.5rem 0; border-color: var(--lightgrey-color);" />

        <h2>Your Blogs</h2>
        <div class="post-cards">
          <div class="post-card" v-for="blog in blogs" :key="blog.id">
            <blog-card :post="blog" />
            <div class="btn-group" 
                style="margin: 1rem auto 0 auto; padding: 0 1rem; display: flex; justify-content: right; gap: 0.5rem;">
                <button class="btn btn-dark btn-sm" style="padding: 0.3rem 0.75rem;" @click="editBlog(blog.id)">Edit</button>
                <button class="btn btn-accent btn-sm" style="padding: 0.3rem 0.75rem;" @click="deleteBlog(blog.id)">Delete</button>
            </div>
            </div>
        </div>
      </div>
    </div>
    `

}