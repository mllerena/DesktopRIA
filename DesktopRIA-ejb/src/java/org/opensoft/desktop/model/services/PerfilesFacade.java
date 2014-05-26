/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package org.opensoft.desktop.model.services;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.opensoft.desktop.model.entities.Perfiles;

/**
 *
 * @author MLLERENA
 */
@Stateless
public class PerfilesFacade extends AbstractFacade<Perfiles> {
    @PersistenceContext(unitName = "DesktopRIA-ejbPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public PerfilesFacade() {
        super(Perfiles.class);
    }
    
}
