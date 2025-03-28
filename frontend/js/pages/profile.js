import BlogCard from '/static/js/components/blog-card.js'

export default {
    props: ['userId'],
    components: {
        BlogCard
    },
    data() {
        return {
            user: {}, // This is the users account being viewed
            mainUser: {}, // user logged in
            blogs: [],
            followers: [],
            following: [],
            isSelf: false,
            isFollowing: false,
        }
    },

    async created() {
        try {

            // get the user logged in
            const meRes = await fetch('/api/users/me');
            if (!meRes.ok) throw new Error('Could not fetch user');
            const meData = await meRes.json();
            this.mainUser = meData.user;

            // check whos viewing is it the owner of the account or a viewer           
            const profileId = Number(this.userId) || this.mainUser.user_id;
            this.isSelf = Number(profileId) === Number(this.mainUser.user_id);
            
            
            // get the info of the user veiwing the profile
            const userRes = await fetch(`/api/users/${profileId}`);
            if (!userRes.ok) throw new Error('Could not fetch user profile');
            const userData = await userRes.json();
            this.user = userData;

            // get blogs
            const blogRes = await fetch(`/api/users/${profileId}/blogs`);
            this.blogs = (await blogRes.json()).map(blog => ({
                ...blog,
                image: blog.image_url || `/static/images/banners/banner-${Math.floor(Math.random() * 10) + 1}.jpg`
            }));

            // get following and followers
            const followersRes = await fetch(`/api/users/${profileId}/followers`);
            if (!followersRes.ok) throw new Error('Could not fetch followers');
            this.followers = await followersRes.json();

            const followingRes = await fetch(`/api/users/${profileId}/follows`);
            if (!followingRes.ok) throw new Error('Could not fetch following');
            this.following = await followingRes.json();


            // check if the viewer follows the owners profile
            this.isFollowing = this.followers.some(follows =>
                follows.user_id === this.mainUser.user_id || follows.id === this.mainUser.user_id
            );

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
        },
        async toggleFollow() {
            const url = `/api/users/${this.mainUser.user_id}/follows/${this.user.id}`;
            const method = this.isFollowing ? 'DELETE' : 'POST';
            const res = await fetch(url, { method });

            if (res.ok) {
                this.isFollowing = !this.isFollowing;

                if (this.isFollowing) {
                    this.followers.push({ user_id: this.mainUser.user_id });
                }
                else {
                    this.followers = this.followers.filter(
                        follows => follows.user_id !== this.mainUser.user_id);
                    
                }

                Toastify({
                    text: this.isFollowing ? "Followed User" : "Unfollowed User",
                    duration: 3000,
                    gravity: "top",
                    position: "center",
                    style: {
                        background: this.isFollowing ? "#28a745" : "#dc3545"
                    }
                }).showToast();
            }
        }
    },
    template: `
   <div class="container">
        <div class="content">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h1>{{ user.username }}'s Profile</h1>
                <button v-if="!isSelf" @click="toggleFollow"
                    class="btn"
                    :class="isFollowing ? 'btn-accent' : 'btn-primary'">
                    {{ isFollowing ? 'Unfollow' : 'Follow' }}
                </button>
            </div>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p>Followers: {{ followers.length }} | Following: {{ following.length }}</p>


            <hr style="margin: 1.5rem 0; border-color: var(--lightgrey-color);" />

            <h2>{{ isSelf ? 'Your Blogs' : user.username + "'s Blogs" }}</h2>

            <div class="post-cards">
                <div class="post-card" v-for="blog in blogs" :key="blog.id"
                    style="display: flex; flex-direction: column; justify-content: space-between;">
                    
                    <blog-card :post="blog" />

                    <div v-if="isSelf" class="btn-group"
                        style="margin-top: auto; display: flex; gap: 0.5rem; justify-content: flex-end; padding: 0.5rem 0.75rem 0.75rem 0;">
                    <button class="btn btn-dark btn-sm" @click="editBlog(blog.id)">Edit</button>
                    <button class="btn btn-accent btn-sm" @click="deleteBlog(blog.id)">Delete</button>
                    </div>
                </div>
            </div>


        </div>
    </div>

    `

}