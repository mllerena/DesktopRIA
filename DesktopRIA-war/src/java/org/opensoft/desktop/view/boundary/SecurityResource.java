/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package org.opensoft.desktop.view.boundary; 

import java.io.Serializable;
import java.util.List;
import javax.ejb.EJB;
import javax.enterprise.context.SessionScoped;
import javax.json.Json;
import javax.json.JsonObjectBuilder;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import javax.xml.bind.JAXBElement;
import org.opensoft.desktop.model.entities.Personas;
import org.opensoft.desktop.model.entities.Usuarios;
import org.opensoft.desktop.model.exceptions.NotFoundException;
import org.opensoft.desktop.model.services.UsuariosFacade;
import org.opensoft.desktop.view.utils.JsonUtil;

/**
 *
 * @author MLLERENA
 */

@Path("/security/")
@SessionScoped
public class SecurityResource implements Serializable{
    
    @EJB
    private UsuariosFacade uf;
    
    private Usuarios usuario;
    
    private boolean connected;
    
    @Context
    private UriInfo uriInfo;
    
    @Context 
    private HttpServletRequest request;
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("global/")
    public Response global( ){
        
        System.out.println("Global method ");
        
        JsonObjectBuilder  jObjectRoot = Json.createObjectBuilder();
        jObjectRoot.add("connected", connected );
        
        if( connected ){
            jObjectRoot.add("usuario", JsonUtil.convertEntityToJSON(usuario).build() );
        }
        
        return Response.ok( jObjectRoot.build() ).build();
        
        
        
    } 
    
    
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("login/")
    public Response login(@FormParam("username") String username,@FormParam("password") String password){
        System.out.println("login method - username: "+username+" - password: "+password);
        
        usuario = new Usuarios();
        
        usuario.setUsuario(username);
        usuario.setClave(password);
        
        JsonObjectBuilder  jBuilder = Json.createObjectBuilder();
        
        try {
            usuario = uf.login(usuario);
            if(usuario != null){
                connected = true;
            }
        } catch (NotFoundException ex) {
            
            jBuilder.add("message", ex.getMessage());
            
            return Response.ok( jBuilder.build() ).build();
        }
        
        return Response.ok( usuario ).build();
        
    } 
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("logout/")
    public Response logout( @Context ServletContext context, @Context HttpServletRequest request,@Context HttpServletResponse response ){
        
        System.out.println("logout context: "+context);
        
        System.out.println("logout request: "+request);
        
        setConnected(false);
        setUsuario(null);
               
        return Response.ok(  ).build();
        
    } 
    
    
    @POST
    @Path("usuarios/create")
    public Response createUsuario(JAXBElement<Usuarios> usuario ){
        System.out.println("createUsuario: "+usuario.getValue());
        System.out.println("getUsuario: "+usuario.getValue().getUsuario());
        System.out.println("getClave: "+usuario.getValue().getClave());
        Usuarios u = usuario.getValue();
        uf.create(u);
        return Response.ok( ).build();
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("usuarios/read")
    public List<Usuarios> findAllUsuarios( ){
        return uf.findAll();
    }
    
    @POST
    @Path("usuarios/update")
    public Response updateUsuario(JAXBElement<Usuarios> usuario ){
        System.out.println("updateUsuario: "+usuario.getValue());
        System.out.println("getUsuario: "+usuario.getValue().getUsuario());
        System.out.println("getClave: "+usuario.getValue().getClave());
        System.out.println("getPersona: "+usuario.getValue().getPersona() );
        Usuarios u = usuario.getValue();
        uf.edit(u);
        
        return Response.ok( ).build();
    } 
    
    @POST
    @Path("usuarios/remove")
    public Response removeUsuario(JAXBElement<Usuarios> usuario ){
        System.out.println("removeUsuario: "+usuario.getValue());
        System.out.println("getUsuario: "+usuario.getValue().getUsuario());
        System.out.println("getClave: "+usuario.getValue().getClave());
        System.out.println("getPersona: "+usuario.getValue().getPersona() );
        Usuarios u = usuario.getValue();
        uf.remove(u);
        return Response.ok( ).build();
    } 
    
    
    
    
    @POST
    @Path("personas/update")
    public Response updatePersona(JAXBElement<Personas> persona ){
        System.out.println("updatePersona - "+persona.getValue());
        System.out.println("getPrimerNombre - "+persona.getValue().getPrimerNombre());
        System.out.println("getPrimerApellido - "+persona.getValue().getPrimerApellido());
        return Response.ok( ).build();
        
    } 
    

    public Usuarios getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuarios usuario) {
        this.usuario = usuario;
    }

    public boolean isConnected() {
        return connected;
    }

    public void setConnected(boolean connected) {
        this.connected = connected;
    }
     
    
}