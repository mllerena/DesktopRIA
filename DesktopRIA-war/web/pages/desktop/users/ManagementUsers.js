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
                width:900,
                height:550,
                iconCls: 'bogus',
                animCollapse:false,
                border:false,
                constrainHeader:true,

                layout: 'border',//fit
                //layout: 'fit',
                
                items: [
                    
                    {
                        region: 'north',
                        border: false,
                        xtype: 'grid',
                        title: 'Listado de usuarios',
                        width: 450,
                        height: 185,
                        id : 'grid-lista-usuario',
                        //autoScroll : true,
                        store: new Ext.data.Store({
                            autoLoad : true,
                            model : 'Usuarios',
                            listeners: {
                                    datachanged : function (store, eOpts){
                                        console.log("datachanged event");
                                    },
                                    update : function ( store, record, operation, eOpts ){
                                        console.log("update event");
                                    }
                            }
                        }),
                        columns: [
                            //new Ext.grid.RowNumberer(),
                            {
                                text: "Código",
                                width: 80,
                                sortable: true,
                                dataIndex: 'codigo'
                                //dataIndex: 'id'
                            },
                            {
                                text: "Usuario",
                                width: 150,
                                sortable: true,
                                dataIndex: 'usuario'
                            },
                            {
                                text: "U. Ingreso",
                                width: 130,
                                sortable: true,
                                dataIndex: 'usuarioIngreso'
                            },
                            {
                                text: "F. Ingreso",
                                width: 140,
                                sortable: true,
                                //format : 'Y-m-d H:i:s',
                                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
                                dataIndex: 'fechaIngreso'
                            },
                            {
                                text: "U. Modificación",
                                width: 130,
                                sortable: true,
                                dataIndex: 'usuarioModificacion'
                            },
                            
                            {
                                text: "F. Modificación",
                                width: 140,
                                sortable: true,
                                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
                                dataIndex: 'fechaModificacion'
                            },
                            {
                                text: "Estado",
                                width: 100,
                                sortable: true,
                                dataIndex: 'estado'
                            }
                        ],
                        listeners: {
                            selectionchange: function(model, records) {
                                if (records[0]) {
                                    
                                    console.log("selectionchange - "+records[0]);
                                    
                                    if(Ext.getCmp('admin-user-codigo').isHidden( )){
                                       Ext.getCmp('admin-user-codigo').show(); 
                                    }
                                        
                                    
                                    var recordUsuario = records[0];
                                    Ext.getCmp('form-det-cuenta').loadRecord(recordUsuario);
                                    Ext.getCmp('confirmPass').setValue(recordUsuario.get('clave'));
                                    
                                    
                                    
                                    //debugger;
                                    
                                    if(records[0].hasOwnProperty("PersonasHasOneInstance") ){
                                        //var recordPersona = Ext.create('Personas', associatedDataRecords.Personas );
                                        var recordPersona = records[0].getPersonas( );
                                        Ext.getCmp('form-dat-personales').loadRecord(recordPersona);
                                    }else{
                                        Ext.getCmp('form-dat-personales').getForm().reset();
                                    }
                                    
                                    
                                    
                                }
                            }
                        }
                    },
                    {
                        id : 'tabpanel-detalle',
                        xtype:'tabpanel',
                        region: 'center',
                        activeTab: 0,
                        defaults:{
                            bodyPadding: 10,
                            layout: 'anchor'
                        },
                        dockedItems: [{
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                { 
                                    xtype: 'button', 
                                    text: 'Grabar',
                                    handler: function() {
                                            var formDetCuenta = Ext.getCmp('form-det-cuenta').getForm();
                                            
                                            var formDatPersonales = Ext.getCmp('form-dat-personales').getForm();
                                            
                                            
                                            if (formDetCuenta.isValid() && formDatPersonales.isValid()) {
                                                
                                                formDetCuenta.updateRecord();
                                                formDatPersonales.updateRecord();
                                                
                                                
                                                formDetCuenta.getRecord( ).save();
                                                
                                                formDatPersonales.getRecord( ).save();
                                                
                                            }
                                    }
                                },
                                { 
                                    xtype: 'button', 
                                    text: 'Nuevo',
                                    handler: function() {
                                        Ext.getCmp('form-det-cuenta').getForm().reset();
                                        Ext.getCmp('admin-user-codigo').hide();
                                        Ext.getCmp('admin-user-usuario').focus();
                                    }
                                }
                            ]
                        }],        
                        items:[
                            {
                                //region: 'center',
                                id : 'form-det-cuenta',
                                border: false,
                                xtype: 'form',
                                title: 'Detalles de la cuenta',
                                bodyPadding: 5,

                                // The form will submit an AJAX request to this URL when submitted
                                url: 'save-form.php',

                                // Fields will be arranged vertically, stretched to full width
                                //layout: 'anchor',
                                defaults: {
                                    //anchor: '100%'
                                    width: 240,
                                    labelWidth: 90,
                                    msgTarget: 'side'
                                },

                                // The fields
                                defaultType: 'textfield',

                                items: [
                                    {
                                        id : 'admin-user-codigo',
                                        fieldLabel: 'Código',
                                        name: 'codigo',
                                        //name: 'id',
                                        readOnly : true
                                    },
                                    {
                                        id : 'admin-user-usuario',
                                        fieldLabel: 'Usuario',
                                        name: 'usuario'
                                    },
                                    {
                                        itemId: 'pass',
                                        fieldLabel: 'Contraseña',
                                        name: 'clave',
                                        inputType : 'password',
                                        listeners: {
                                            validitychange: function(field){
                                                field.next().validate();
                                            },
                                            blur: function(field){
                                                field.next().validate();
                                            }
                                        }
                                    },
                                    {
                                        id: 'confirmPass',
                                        fieldLabel: 'Confirmar Contraseña',
                                        name: 'confirmClave',
                                        inputType : 'password',
                                        vtype: 'password',
                                        initialPassField: 'pass'
                                    },
                                    {
                                        xtype : 'combobox',
                                        fieldLabel: 'Estado',
                                        name: 'estado',
                                        store: Global.STATUS_LIST,
                                        queryMode: 'local',
                                        valueField: 'estado',
                                        displayField: 'estado'
                                    }
                                ]

                                // Reset and Submit buttons
                                /*,
                                buttons: [
                                    {
                                        text: 'Nuevo',
                                        handler: function() {
                                            this.up('form').getForm().reset();
                                        }
                                    }, {
                                        text: 'Grabar',
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
                                    }
                                ]*/
                                
                                
                                
                            },
                            {
                                id : 'form-dat-personales',
                                border: false,
                                xtype: 'form',
                                title: 'Datos personales',
                                bodyPadding: 5,

                                // The form will submit an AJAX request to this URL when submitted
                                url: 'save-form.php',

                                // Fields will be arranged vertically, stretched to full width
                                //layout: 'anchor',
                                defaults: {
                                    //anchor: '100%'
                                    width: 240,
                                    labelWidth: 90,
                                    msgTarget: 'side'
                                },

                                // The fields
                                defaultType: 'textfield',

                                items: [
                                    {
                                        fieldLabel: 'Primer nombre',
                                        name : 'primerNombre'
                                    },
                                    {
                                        fieldLabel: 'Segundo nombre',
                                        name : 'segundoNombre'
                                    },
                                    {
                                        fieldLabel: 'Primer apellido',
                                        name : 'primerApellido'
                                    },
                                    {
                                        fieldLabel: 'Segundo apellido',
                                        name : 'segundoApellido'
                                    },
                                    {
                                        fieldLabel: 'Identificación',
                                        name : 'identificacion'
                                    },
                                    
                                    /*
                                    
                                    {
                                        fieldLabel: 'Dirección',
                                        name : 'primerNombre'
                                    },
                                    {
                                        fieldLabel: 'Parroquia',
                                        name : 'primerNombre'
                                    },
                                    {
                                        fieldLabel: 'Teléfono',
                                        name : 'primerNombre'
                                    },
                                    */
                                    {
                                        xtype : 'combobox',
                                        fieldLabel: 'Estado',
                                        name: 'estado',
                                        store: Global.STATUS_LIST,
                                        queryMode: 'local',
                                        valueField: 'estado',
                                        displayField: 'estado'
                                    }
                                ]

                                // Reset and Submit buttons
                                /*
                                buttons: [
                                    {
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
                                    }
                                ]
                                */
                            }  
                        ]
                    }
                ]
            });
        }
        return win;
    }
});
