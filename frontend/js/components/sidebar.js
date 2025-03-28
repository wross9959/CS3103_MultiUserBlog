export default {
    props: ['categories', 'following', 'selectedCategory'],
    emits: ['filter-category', 'filter-user'],
    template: `
        <div class="sidebar">
            <h3>Categories</h3>
            <ul v-if="categories.length">
                <li v-for="cat in categories" :key="cat.id" @click="$emit('filter-category', cat.name)">
                    {{ cat.name }}
                </li>
            </ul>
            <p v-else class="sidebar-empty">Nothing to note.</p>

            <h3 style="margin-top: 2rem;">Following</h3>
            <ul v-if="following.length">
                <li v-for="user in following" :key="user.id" @click="$emit('filter-user', user.username)">
                    {{ user.username }}
                </li>
            </ul>
            <p v-else class="sidebar-empty">Nothing to note.</p>
        </div>
    `,
    style: `
        .sidebar-empty {
            font-size: 0.8rem;
            color: var(--selectLight-color);
            margin-top: 0.5rem;
        }
    `
}
