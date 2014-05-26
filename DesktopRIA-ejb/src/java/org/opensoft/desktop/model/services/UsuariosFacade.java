/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package org.opensoft.desktop.model.services;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import org.opensoft.desktop.model.entities.Usuarios;
import org.opensoft.desktop.model.exceptions.NotFoundException;

/**
 *
 * @author MLLERENA
 */
@Stateless
public class UsuariosFacade extends AbstractFacade<Usuarios> {
    @PersistenceContext(unitName = "DesktopRIA-ejbPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public UsuariosFacade() {
        super(Usuarios.class);
    }
    
    public Usuarios login(Usuarios usuario) throws NotFoundException{
        Query query = em.createNamedQuery("Usuarios.findByUsuarioAndClave");
        query.setParameter("usuario", usuario.getUsuario());
        query.setParameter("clave", usuario.getClave());
        
        try{
            usuario = (Usuarios) query.getSingleResult();
        }catch(NoResultException e){
            throw new NotFoundException("Usuario y/o contraseña incorrectos");
        }
        
        return usuario;
    } 
    
}
