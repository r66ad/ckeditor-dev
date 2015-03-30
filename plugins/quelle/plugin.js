
( function() {
    CKEDITOR.plugins.add( 'quelle', {
        icons: 'quelle',
		hidpi: true, // %REMOVE_LINE_CORE%
        init: function( editor ) {
			var pluginName = 'quelle';
            //editor.addCommand( pluginName, {
            //    exec: function( editor ) {
            //        var now = new Date();
            //        var img = getSelectedImage( editor );
            //        if (img) {
            //            editor.insertHtml( '<div style="text-align:center">' + img + '</div>' );
            //        }
            //        
            //    }
            //});
			editor.addCommand( 'quelle', new CKEDITOR.dialogCommand( 'quelleDialog' ) );

            CKEDITOR.dialog.add( 'quelleDialog', this.path + 'dialogs/quelle.js' );
            editor.ui.addButton && editor.ui.addButton( pluginName, {
                label: 'Insert Quelle',
                command: pluginName,
                toolbar: 'insert'
            });
            //return { abbrItem: CKEDITOR.TRISTATE_OFF };
        }
    });
    function getSelectedImage( editor, element ) {
		if ( !element ) {
			var sel = editor.getSelection();
			element = sel.getSelectedElement();
		}

		if ( element && element.is( 'img' ) && !element.data( 'cke-realelement' ) && !element.isReadOnly() )
			return element;
	}
    // Wraps <img/> -> <a><img/></a>.
    // Returns reference to <a>.
    //
    // @param {CKEDITOR.dom.element} img
    // @param {Object} linkData
    // @returns {CKEDITOR.dom.element}
    function wrapInLink( img, linkData ) {
        var link = doc.createElement( 'a', {
            attributes: {
                href: linkData.url
            }
        } );

        link.replace( img );
        img.move( link );

        return link;
    }

    // De-wraps <a><img/></a> -> <img/>.
    // Returns the reference to <img/>
    //
    // @param {CKEDITOR.dom.element} link
    // @returns {CKEDITOR.dom.element}
    function unwrapFromLink( link ) {
        var img = link.findOne( 'img' );

        img.replace( link );

        return img;
    }


} )();
