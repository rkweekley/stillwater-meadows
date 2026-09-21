# Stillwater Meadows — static venue site
# Served via nginx:alpine behind Nginx Proxy Manager on the Mac Mini.

FROM nginx:1.27-alpine

# Remove default site, copy our static content
RUN rm -f /etc/nginx/conf.d/default.conf
COPY deploy/nginx.conf /etc/nginx/conf.d/stillwater.conf
COPY index.html venue.html gallery.html pricing.html faq.html contact.html \
      robots.txt sitemap.xml favicon.svg /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY img/ /usr/share/nginx/html/img/
COPY fonts/ /usr/share/nginx/html/fonts/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]