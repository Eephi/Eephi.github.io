const app = Vue.createApp({
    mixins: Object.values(mixins),
    data() {
        return {
            loading: true,
            showMenu: false,
            barLocal: 0,
            renderers: [],
            showSearch: false,
            searchData: false,
            searchQuery: "",
            datas: []
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
            let background = this.$refs.homeBackground;
            window.scrollTo({ top: background.offsetHeight, behavior: "smooth" });
        },
        searchClick(){
            document.body.style.overflowY = "hidden";
            this.showSearch = true;
            if (!this.searchData) {
                this.searchFunc(window.searchPath);
            }
            this.searchData = true;
        },
        closeClick() {
            document.body.style.overflowY = "auto";
            this.showSearch = false;
        },
        searchFunc(path) {
            'use strict';
            $.ajax({
                url: path,
                dataType: "xml",
                success: (xmlResponse) => {
                    // get the contents from search data
                    this.datas = $( "entry", xmlResponse ).map(function() {
                        return {
                            title: $( "title", this ).text(),
                            content: $("content",this).text(),
                            url: $( "url" , this).text()
                        };
                    }).get();
                },
            });
        },
        handleSearch() {
            let content_id = "local-search-result";
            let resultContent = document.getElementById(content_id);
            let str='<ul class=\"search-result-list\">';                
            let keywords = this.searchQuery.trim().toLowerCase().split(/[\s\-]+/);

            resultContent.innerHTML = "";
            if (this.searchQuery.trim().length <= 0) {
                return;
            }
            // perform local searching
            this.datas.forEach(function(data) {
                let isMatch = true;
                let content_index = [];
                let data_title = data.title.trim().toLowerCase();
                let data_content = data.content.trim().replace(/<[^>]+>/g,"").toLowerCase();
                let data_url = data.url;
                let index_title, index_content, first_occur = -1;
                // only match artiles with not empty titles and contents
                if(data_title != '' && data_content != '') {
                    keywords.forEach(function(keyword, i) {
                        index_title = data_title.indexOf(keyword);
                        index_content = data_content.indexOf(keyword);
                        if( index_title < 0 && index_content < 0 ){
                            isMatch = false;
                        } else {
                            if (index_content < 0) {
                                index_content = 0;
                            }
                            if (i == 0) {
                                first_occur = index_content;
                            }
                        }
                    });
                }
                // show search results
                if (isMatch) {
                    var match_title = data.title;
                    keywords.forEach(function(keyword) {
                        var regS = new RegExp(keyword, "gi");
                        match_title = match_title.replace(regS, function(match) {
                            return "<span class=\"search-keyword\">"+match+"</span>";
                        })
                    });
                    str += "<div class='local-search__hit-item'><a href='" + data_url + "'><span class='search-result-title'>"+ match_title +"</span>";

                    var content = data.content.trim().replace(/<[^>]+>/g,"");
                    if (first_occur >= 0) {
                        // cut out 100 characters
                        var start = first_occur - 20;
                        var end = first_occur + 80;

                        if(start < 0){
                            start = 0;
                        }
                        if(start == 0){
                            end = 100;
                        }
                        if(end > content.length){
                            end = content.length;
                        }

                        var match_content = content.substr(start, end); 

                        // highlight all keywords
                        keywords.forEach(function(keyword){
                            var regS = new RegExp(keyword, "gi");
                            match_content = match_content.replace(regS, function(match) {
                                return "<span class=\"search-keyword\">"+match+"</span>";
                            })
                        });
                        str += "<p class=\"search-result\">" + match_content +"...</p>";
                    }
                    let split = data_url.split("/")
                    let date = split[1] + "-" + split[2] + "-" + split[3];
                    str += "<span class='search-result-date'>" + date + "</span>";
                    str += "</a></div>";
                }
            });
            str += "</ul>";
            resultContent.innerHTML = str;
        },
        render() {
            if (typeof this.renderers === "undefined") return;
            for (let i of this.renderers) i();
        },
        handleScroll() {
            let menu = this.$refs.menu;
            let background = this.$refs.homeBackground;
            /*let wrap = this.$refs.homePostsWrap;*/
            let newlocal = document.documentElement.scrollTop;
            if (newlocal <= background.offsetHeight - 100) {
                menu.classList.add("menu-color");
                menu.innerHTML(newlocal)
            }
            else {
                menu.classList.remove("menu-color");
                if (this.barLocal < newlocal) {
                    this.showMenu = false;
                    menu.classList.add("hidden");
                } else {
                    menu.classList.remove("hidden");
                }
            }
            /*if (newlocal <= 400) wrap.style.marginTop = -newlocal / 5 + "px";
            else wrap.style.marginTop = "-80px";*/
            this.barLocal = newlocal;
        },
    },
});
app.mount("#layout");
