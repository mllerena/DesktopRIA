/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.users.ManagementUsers', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.tab.Panel'
    ],

    id:'users-win',

    init : function(){
        
        // this.launcher .. en menu inicio
        
        /*
        this.launcher = {
            text: 'Administración usuarios',
            iconCls:'bogus'
        }
        */
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('users-win');
        if(!win){
            win = desktop.createWindow({
                id: 'users-win',
                title:'Administración de Usuarios',
                width:740,
                height:480,
                iconCls: 'bogus',
                animCollapse:false,
                border:false,
                constrainHeader:true,

                layout: 'border',//fit
                
                items: [
                    
                    {
                        region: 'north',
                        border: false,
                        xtype: 'grid',
                        //height: 50,
                        store: new Ext.data.ArrayStore({
                            autoLoad : true,
                            fields: [
                               { name: 'codigo' },
                               { name: 'usuario' },
                               { name: 'clave' },
                               { name: 'fechaIngreso', type: 'date' }
                            ],
                            proxy: {
                                type: 'ajax',
                                url: Global.SECURITY + "/users/",
                                reader: {
                                    type: 'json',
                                    //root: 'images',
                                    idProperty: 'codigo'
                                }
                            }
                        }),
                        columns: [
                            //new Ext.grid.RowNumberer(),
                            {
                                text: "Código",
                                sortable: true,
                                dataIndex: 'codigo'
                            },
                            {
                                text: "usuario",
                                width: 150,
                                sortable: true,
                                dataIndex: 'usuario'
                            },
                            {
                                text: "Fecha",
                                width: 150,
                                sortable: true,
                                //format : 'Y-m-d H:i:s',
                                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
                                dataIndex: 'fechaIngreso'
                            }
                        ]
                    },
                    {
                        region: 'center',
                        border: false,
                        xtype: 'form',
                        title: 'Simple Form',
                        bodyPadding: 5,

                        // The form will submit an AJAX request to this URL when submitted
                        url: 'save-form.php',

                        // Fields will be arranged vertically, stretched to full width
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },

                        // The fields
                        defaultType: 'textfield',
                        items: [{
                            fieldLabel: 'First Name',
                            name: 'first',
                            allowBlank: false
                        },{
                            fieldLabel: 'Last Name',
                            name: 'last',
                            allowBlank: false
                        }],

                        // Reset and Submit buttons
                        buttons: [{
                            text: 'Reset',
                            handler: function() {
                                this.up('form').getForm().reset();
                            }
                        }, {
                            text: 'Submit',
                            formBind: true, //only enabled once the form is valid
                            disabled: true,
                            handler: function() {
                                var form = this.up('form').getForm();
                                if (form.isValid()) {
                                    form.submit({
                                        success: function(form, action) {
                                           Ext.Msg.alert('Success', action.result.msg);
                                        },
                                        failure: function(form, action) {
                                            Ext.Msg.alert('Failed', action.result.msg);
                                        }
                                    });
                                }
                            }
                        }]
                    }
                ]
            });
        }
        return win;
    }
});
