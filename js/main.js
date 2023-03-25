const app = Vue.createApp({
    mixins: Object.values(mixins),
    data() {
        return {
            loading: true,
            showMenu: false,
            barLocal: 0,
            renderers: [],
        };
    },
    created() {
        window.addEventListener("load", () => {
            this.loading = false;
        });
    },
    mounted() {
        let menu = this.$refs.menu,
            background = this.$refs.homeBackground;
        menu.classList.add("menu-color");
        let image = background.dataset.image.split(",");
        let id = Math.floor(Math.random() * image.length);
        background.style.backgroundImage = `url('${image[id]}')`;

        window.addEventListener("scroll", this.handleScroll, true);
        this.render();
    },
    methods: {
        homeClick() {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        },
        render() {
            if (typeof this.renderers === "undefined") return;
            for (let i of this.renderers) i();
        },
        handleScroll() {
            let menu = this.$refs.menu;
            /*let wrap = this.$refs.homePostsWrap;*/
            let newlocal = document.documentElement.scrollTop;
            if (newlocal <= window.innerHeight - 100) {
                menu.classList.add("menu-color");
            }
            else {
                menu.classList.remove("menu-color");
                if (this.barLocal < newlocal) {
                    this.showMenu = false;
                    menu.classList.add("hidden");
                } else menu.classList.remove("hidden");
            }
            /*if (newlocal <= 400) wrap.style.marginTop = -newlocal / 5 + "px";
            else wrap.style.marginTop = "-80px";*/
            this.barLocal = newlocal;
        },
    },
});
app.mount("#layout");
