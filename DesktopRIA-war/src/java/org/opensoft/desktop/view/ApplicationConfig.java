/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package org.opensoft.desktop.view;

import java.util.HashSet;
import java.util.Set;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import org.opensoft.desktop.view.boundary.SecurityResource;

/**
 *
 * @author MLLERENA
 */

@ApplicationPath("recursos")
public class ApplicationConfig extends Application{
    
    @Override
    public Set<Class<?>> getClasses() {
        return new HashSet<Class<?>>() {{
            add(SecurityResource.class);
        }};
    }
    
}
