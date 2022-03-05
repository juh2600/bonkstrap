FROM redhat/ubi8 AS build
WORKDIR /tmp
RUN curl -Lo dart-sass.tar.gz https://github.com/sass/dart-sass/releases/download/1.49.9/dart-sass-1.49.9-linux-x64.tar.gz
RUN tar -xzvf dart-sass.tar.gz
WORKDIR /app
COPY sass/ .
RUN /tmp/dart-sass/sass bonkstrap.scss /out/style.css

FROM scratch
COPY --from=build /out /
