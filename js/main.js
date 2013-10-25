require.config({
    paths: {
        text: 'vendor/text',

        jquery: 'vendor/jquery',
        jqueryAnimateColors: 'vendor/jquery.animate.colors',
        jqueryBrowser: 'vendor/jquery.browser',
        jqueryFlot: 'vendor/jquery.flot',
        jquerySvg: 'vendor/jquery.svg',
        jqueryAnimateSvg: 'vendor/jquery.svganim',

        sylvester: 'vendor/sylvester',

        reveal: 'vendor/reveal',
        head: '../lib/js/head',
        marked: '../plugin/markdown/marked'
    },

    shim: {
        jqueryBrowser: {
            exports: '$.browser'
        },
        jquerySvg: {
            exports: '$.svg'
        },
        sylvester: {
            exports: 'Sylvester'
        },
        reveal: {
            exports: 'Reveal'
        }
    }
});


require(['head', 'jquery', 'marked', 'custom/structure.builder' ], function(head, $, marked, StructureBuilder) {
    // Adds ".reveal .slides" section
    StructureBuilder().buildRevealStructure();

    // Since we both use AMD and non-AMD plugins, we must load marked asynchronously
    if (!!document.querySelector('[data-markdown]')) {
        window.marked = marked;
    }

    require(['custom/loader'], function(CustomLoader) {
        CustomLoader().initialize(function() {
            require(['reveal', 'sylvester'], function(Reveal) {
                require(['jqueryAnimateColors', 'jqueryBrowser', 'jqueryFlot', 'jquerySvg'], function() {
                    require(['jqueryAnimateSvg'], function() {
                        // The framework is now initialized
                        var event = new CustomEvent("initialized", {});
                        document.body.dispatchEvent(event);

                        // Full list of configuration options available here:
                        // https://github.com/hakimel/reveal.js#configuration
                        Reveal.initialize({
                            margin: 0,

                            //minScale: 1.0,
                            //maxScale: 1.0,

                            controls: false,
                            progress: false,
                            history: true,
                            center: true,

                            theme: 'sky', // available themes are in /css/theme
                            transition: 'cube', // default/cube/page/concave/zoom/linear/fade/none

                            rollingLinks: false,

                            // Optional libraries used to extend on reveal.js
                            dependencies: [
                                { src: 'lib/js/classList.js', condition: function() {
                                    return !document.body.classList;
                                } },
                                { src: 'plugin/markdown/markdown.js', condition: function() {
                                    return !!document.querySelector('[data-markdown]');
                                } },
                                { src: 'plugin/highlight/highlight.js', callback: function() {
                                    hljs.initHighlighting();
                                } },
                                { src: 'plugin/zoom-js/zoom.js', async: true, condition: function() {
                                    return !!document.body.classList;
                                } },
                                { src: 'plugin/notes/notes.js', async: true, condition: function() {
                                    return !!document.body.classList;
                                } },
                                { src: 'plugin/animate/reveal.quickanim.js', async: false, callback: function() {
                                    var quickAnimationsTransformer = Reveal.QuickAnimationTransformer({
                                        animationClass: 'animated-html',
                                        duration: 500
                                    });
                                    quickAnimationsTransformer.transform();
                                } },
                                { src: 'plugin/animate/reveal.animate.js', async: true, callback: function() {
                                    Reveal.Animate({
                                        animationProviders: {
                                            'animated-svg': Reveal.Animate.Svg(),
                                            'animated-html': Reveal.Animate.Html()
                                        }
                                    });
                                } },
                                { src: 'plugin/sectiontitle/reveal.sectiontitle.js', async: false, callback: function() {
                                    var sectionTitle = Reveal.SectionTitle({
                                        header: '<h2>Übersicht</h2>',
                                        wrapper: {
                                            start: '<div class="titles-parent"><div class="titles">',
                                            end: '</div></div>'
                                        },
                                        sectionClass: 'overview',
                                        titleClass: 'title',
                                        selectedTitleClass: 'selected-title'
                                    });
                                    sectionTitle.createSections();
                                } }
                            ]
                        });

                    });
                });
            });
        })
        ;
    })
})
;