# uncomment if you use cache
ARG DOCKER_CACHE_IMAGE
FROM $DOCKER_CACHE_IMAGE AS cache


FROM node:20.17-alpine3.20 AS node

FROM ruby:3.3.5-alpine3.20


ARG SECRET_KEY_BASE
ENV SECRET_KEY_BASE $SECRET_KEY_BASE

# GENERAL ENVS #
ENV APP_PATH "/project"
ENV APP_BIN_PATH "$APP_PATH/bin"
ENV PATH "$PATH:$APP_BIN_PATH"

# RUBY ENVS #
ENV BUNDLE_PATH "$APP_PATH/vendor/bundle"
ENV BUNDLE_BIN "$BUNDLE_PATH/ruby/3.3.5/bin"
ENV BUNDLE_RUBY "$BUNDLE_PATH/ruby/3.3.5"
ENV PATH "$PATH:$BUNDLE_BIN"
ENV BUNDLE_JOBS 4
ENV RAILS_ENV production

# NODE ENVS #
ENV NODE_ENV production

# DEPLOY TOKENS for build pipeline
ARG GEM_REGISTRY_URL
ENV GEM_REGISTRY_URL=$GEM_REGISTRY_URL

# Get node instalation
COPY --from=node /usr/lib /usr/lib
COPY --from=node /usr/local/lib /usr/local/lib
COPY --from=node /usr/local/include /usr/local/include
COPY --from=node /usr/local/bin /usr/local/bin

WORKDIR $APP_PATH

COPY ./bin/install-system-dependencies $APP_BIN_PATH/install-system-dependencies
RUN install-system-dependencies

# uncomment if you use cache
COPY --from=cache $APP_PATH/vendor/bundle $APP_PATH/vendor/bundle
COPY Gemfile Gemfile.lock $APP_PATH/
RUN bundle install && bundle clean

# uncomment if you use cache
COPY --from=cache $APP_PATH/node_modules $APP_PATH/node_modules
COPY .yarnrc package.json yarn.lock .npmrc $APP_PATH/
# Node patches
COPY patches/ $APP_PATH/patches
RUN YARN_CACHE_FOLDER=/dev/shm/yarn_cache yarn install --production
# RUN yarn install --production

# uncomment if you use cache
COPY --from=cache $APP_PATH/public $APP_PATH/public
# COPY --from=cache $APP_PATH/tmp/cache/webpacker/last-compilation-digest-production $APP_PATH/tmp/cache/webpacker/last-compilation-digest-production
COPY . $APP_PATH

# RUN yarn build:css
# Spree gems try to initialize rails and this makes rails attempt to connect to a db
# nulldb converts all db operations to no-ops
RUN SKIP_YARN_INSTALL=true DOCKER_BUILDING=true DATABASE_ADAPTER=nulldb rails assets:precompile --trace
# RUN NODE_OPTIONS="--max_old_space_size=12288" SKIP_YARN_INSTALL=true DOCKER_BUILDING=true DATABASE_ADAPTER=nulldb rails assets:precompile --trace

RUN SKIP_YARN_INSTALL=true DOCKER_BUILDING=true DATABASE_ADAPTER=nulldb rails assets:clean

# Remove bundler cache to avoid copy from cache image issues
RUN rm -rf $BUNDLE_RUBY/cache


ENTRYPOINT [ "docker/production/entrypoint" ]

EXPOSE 3000
