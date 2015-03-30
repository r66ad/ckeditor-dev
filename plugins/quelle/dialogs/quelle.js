CKEDITOR.dialog.add( 'quelleDialog', function ( editor ) {
    return {
        title: 'Quellenangaben',
        minWidth: 400,
        minHeight: 200,

        contents: [
            {
                id: 'tab-basic',
                label: 'Settings',
                elements: [
                {
                    type: 'text',
                    id: 'quelle',
                    label: 'Quelle',
                    validate: CKEDITOR.dialog.validate.notEmpty("Quellenfeld sollte nicht leer sein." ),
                    setup: function( element ) {
                        this.setValue( element.getFirst().getNext().getNext().getText() );
                    },
                    commit: function( element ) {
                        element.getFirst().getNext().getNext().setText( this.getValue() );
                    }
                }
                ]
            }
        ],
        onShow: function() {
            // The code that will be executed when a dialog window is loaded.
            var selection = editor.getSelection();
            var element = selection.getStartElement();
            this.src=element.getAttribute('src');
            if ( !element || element.getName() != 'img' ) {
                alert("Please select an image first!");
                CKEDITOR.dialog.getCurrent().hide();
                return false;
            }
            
            if ( !element || element.getParent().getName() != 'div' ) {
                var div    = editor.document.createElement( 'div' );
                var img    = editor.document.createElement( 'img' );
                var small  = editor.document.createElement( 'small' );
                var br     = editor.document.createElement( 'br' );
                div.setAttribute('class', 'quelle' );
                img.setAttribute('src', this.src);

                if (element.getStyle('width')) {
                    img.setStyle('width',element.getStyle('width'));
                }
                
                if (element.getStyle('height')) {
                    img.setStyle('height',element.getStyle('height'));
                }
                
                //img.setStyle('height',);
                
                //small.setText( dialog.getValueOf( 'tab-basic', 'quelle' ) );
                //small.setAttribute('id', 'quelle');
    
                div.append(img);
                div.append(br);
                
                div.append(small);
                
                element=div;
                this.insertMode = true;
            }
            else {
                element = element.getParent();
                this.insertMode = false;
            }

//alert(element.getFirst().getNext().getNext().getName());
            this.element = element;
            if ( !this.insertMode )
                this.setupContent( element );
            },
        onOk: function() {
            //http://html5hub.com/html5-picture-element/
            var dialog = this;

            if ( dialog.insertMode )
                editor.insertElement( this.element );
            dialog.commitContent( this.element );
        }
    };
});