export default {
    props: ['id'],
    data() {
        return {
            post: null,
            comments: [],
            showCommentForm: false,
            newComment: '',
            mainUser: {},
        }
    },
    methods: {
        formatBlog(text) {
            return text.split('\n').map(p => `<p>${p}</p>`).join('');
        },
        async addComment() {
            if (!this.newComment.trim()) return;


            const res = await fetch(`/api/blogs/${this.id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ body: this.newComment }),
            });

            if (!res.ok) {
                alert('Failed to add comment');
                return;
            }

            this.comments.unshift({
                body: this.newComment,
                user_id: this.mainUser.user_id,
                username: this.mainUser.username,
                created_at: new Date().toLocaleDateString(),
            });

            this.newComment = '';
            this.showCommentForm = false;
    
        }
    },
    async created() {

        const [meRes, postRes, commentRes] = await Promise.all([
            fetch('/api/users/me'),
            fetch(`/api/blogs/${this.id}`),
            fetch(`/api/blogs/${this.id}/comments`)
        ]);
        const me = (await meRes.json()).user;
        const meInfo = await fetch(`/api/users/${me.user_id}`).then(res => res.json());
        this.mainUser = {
            user_id: me.user_id,
            username: meInfo.username
        }

        this.post = (await postRes.json());
        this.post.created_at = new Date(this.post.created_at).toLocaleDateString();
        this.post.image = this.post.image_url || `/static/images/banners/banner-${Math.floor(Math.random() * 10) + 1}.jpg`;

        const userRes = await fetch(`/api/users/${this.post.user_id}`);
        const userData = await userRes.json();
        this.post.username = userData.username;

        const commentsRaw = await commentRes.json();

        this.comments = await Promise.all(
            commentsRaw.map(async comment => {
                const userInfo = await fetch(`/api/users/${comment.user_id}`)
                .then(res => res.json());
                return {
                    ...comment,
                    username: userInfo.username,
                    created_at: new Date(comment.created_at).toLocaleDateString()
                };
            })
        );

        // fetch(`/api/blogs/${this.id}`)
        //     .then(response => response.json())
        //     .then(data => {
        //         this.post = data
        //         this.post.created_at = new Date(this.post.created_at).toLocaleDateString()
        //         this.post.image = this.post.image_url ||`/static/images/banners/banner-${Math.floor(Math.random() * 10) + 1}.jpg`;
                
        //         fetch(`/api/users/${this.post.user_id}`)
        //             .then(response => response.json())
        //             .then(data => {
        //                 this.post.username = data.username;
        //         });

        //         fetch(`/api/blogs/${this.id}/comments`)
        //             .then(response => response.json())
        //             .then(data => {
        //                 this.comments = data.map(comment => ({
        //                     ...comment,
        //                     created_at: new Date(comment.created_at).toLocaleDateString()
        //                 }));
        //         });
        //     });
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
        <hr style="margin: 2rem 0; border-color: var(--lightgrey-color);" />

        <div class="comments-section">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h2 style="margin: 0;">Comments</h2>
                <button class="btn btn-primary" @click="showCommentForm = !showCommentForm">
                    {{ showCommentForm ? 'Cancel' : 'Add Comment' }}
                </button>
            </div>

            <div v-if="showCommentForm" style="margin-bottom: 2rem;">
                <textarea class="form-control" v-model="newComment" rows="4" placeholder="Write your comment..."></textarea>
                <div style="margin-top: 1rem; text-align: right;">
                    <button class="btn btn-success" @click="addComment">Submit Comment</button>
                </div>
            </div>

            <div v-if="comments.length === 0" class="sidebar-empty">No comments yet.</div>

            <div
                class="comment-card"
                v-for="comment in comments"
                :key="comment.id"
                style="
                    background-color: var(--secondary-color);
                    border-radius: 1rem;
                    padding: 1rem;
                    margin-bottom: 1.5rem;
                "
            >
                <p><strong>Username: </strong> 
                    <router-link :to="{ name: 'profile', params: { user_id: comment.user_id } }" class="author-link">
                        {{ comment.username }}
                    </router-link>
                </p>
                <p style="font-size: 0.9rem; color: var(--light-color);">{{ comment.created_at }}</p>
                <p style="margin-top: 0.5rem;">{{ comment.body }}</p>
            </div>
        </div>

    </div>`
}