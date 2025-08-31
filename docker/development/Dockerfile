FROM ruby:3.3.5-alpine3.20

# GENERAL ENVS #
ENV APP_PATH /project
ENV APP_BIN_PATH "$APP_PATH/bin"
ENV PATH "$PATH:$APP_BIN_PATH"
ENV HOME "$APP_PATH/docker/development/home"

# RUBY ENVS #
ENV BUNDLE_PATH "$APP_PATH/vendor/bundle"
ENV BUNDLE_BIN "${BUNDLE_PATH}/ruby/3.3.5/bin"
ENV PATH "${PATH}:${BUNDLE_BIN}"
ENV BUNDLE_JOBS 4
ENV RAILS_ENV development

# NODE ENVS #
ENV NODE_ENV development

WORKDIR $APP_PATH

COPY ./bin/install-system-dependencies $APP_BIN_PATH/install-system-dependencies
RUN install-system-dependencies

RUN mkdir -p $BUNDLE_PATH && chown dfsobreira:dfsobreira $BUNDLE_PATH

USER dfsobreira

ENTRYPOINT [ "docker/development/entrypoint" ]

EXPOSE 3000