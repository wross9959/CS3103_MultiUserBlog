export default {
    props: ['categories', 'following', 'selectedCategory', 'selectedUser'],
    emits: ['filter-category', 'filter-user'],
    methods: {
        isSelectedCategory(catName) {
            return this.selectedCategory === catName;
        },
        isSelectedUser(userName) {
            return this.selectedUser === userName;
        }
    },
    template: `
       <div class="sidebar">
            <h3>Categories</h3>
            <ul v-if="categories.length">
                <li
                    v-for="cat in categories"
                    :key="cat.id"
                    @click="$emit('filter-category', cat.name)"
                    :class="{ active: isSelectedCategory(cat.name) }"
                >
                    {{ cat.name }}
                </li>
            </ul>
            <p v-else class="sidebar-empty">Nothing to note.</p>

            <h3 style="margin-top: 2rem;">Following</h3>
            <ul v-if="following.length">
                <li
                    v-for="user in following"
                    :key="user.id"
                    @click="$emit('filter-user', user.username)"
                    :class="{ active: isSelectedUser(user.username) }"
                >
                    {{ user.username }}
                </li>
            </ul>
            <p v-else class="sidebar-empty">Nothing to note.</p>
        </div>
    `
}
