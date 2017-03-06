#!/bin/bash

cd ../../dist
mkdir WEB-INF
echo "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><web-app xmlns=\"http://java.sun.com/xml/ns/j2ee\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd\"  version=\"2.4\"> <display-name>LNU Compass</display-name>    <description>This is a web application.    </description>   <error-page> <error-code>404</error-code> <location>/index.html</location> </error-page> </web-app>" > ./WEB-INF/web.xml
rm -f ROOT.war
zip -r ROOT.war *
