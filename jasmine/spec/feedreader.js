$(function() {

    /**
     * @description Main test suite for RSS Feeds
     */
    describe('RSS Feeds', function() {

        /**
         * @description Test that the feeds variable exists and is not empty
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        var i;

        /**
         * @description Test that each feed has a valid url
         */
        it('each feed has an url', function(){

            for( i = 0; i < allFeeds.length; i++ ) {

                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).toBeGreaterThan(0);

            }

        });

        /**
         * @description Test that each feed has a valid name
         */
        it('each feed has a name', function(){

            for( i = 0; i < allFeeds.length; i++ ) {

                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).toBeGreaterThan(0);

            }

        });

    });

    /**
     * @description Test suite for the menu
     */
    describe( 'The menu', function(){

        var $body = $('body'),
            $icon = $('.menu-icon-link');

        /**
         * @description Test that the menu is hidden on page load
         */
        it('should be hidden by default', function(){

            expect( $body.hasClass('menu-hidden')).toBeTruthy();

        });

        /**
         * @description Test that the menu visibility changes when clicking the menu icon
         */
        it('visibility should change when menu icon is clicked', function(){

            $icon.trigger('click');

            expect( $body.hasClass('menu-hidden')).toBeFalsy();

            $icon.trigger('click');

            expect( $body.hasClass('menu-hidden')).toBeTruthy();

        });

    });

    /**
     * @description Test suite for the initial entries on page load
     */
    describe( 'Initial Entries', function(){

        /**
         * @description We are testing async functionality, so need to use done() withint the beforeEach block
         */
        beforeEach( function(done){

            loadFeed(0, function(){
                done();
            });

        });

        /**
         * @description Test that there is at least one entry loaded
         */
        it('at least 1 entry is added to DOM', function(done){

            expect( $('.entry', '.feed').length ).toBeTruthy();
            done();

        });

    });

    /**
     * @description Test suite for functionality on changing the currently loaded feed.
     */
    describe('New Feed Selection', function(){

        var initialContent;

        /**
         * @description Setup beforeEach block to test for async functionality
         */
        beforeEach( function(done){

            // load a feed and store the first entry for later comparison
            loadFeed(1, function(){

                initialContent = $('.entry','.feed').html();

                // load a different feed and trigger the spec
                loadFeed(0,function(){

                   done();

                });

            });

        });

        /**
         * @description Test that DOM changes when loading new feed
         */
        it('new content is loaded', function(done){

            expect( $('.entry','.feed').html() ).not.toBe( initialContent );
            done();

        });

    });

}());
