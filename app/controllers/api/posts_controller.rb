# frozen_string_literal: true

module Api
  class PostsController < ApplicationController
    respond_to :json

    def index
      respond_with Post.order(created_at: :desc)
    end

    def show
      respond_with Post.find(params[:id])
    end

    def create
      respond_with :api, Post.create(post_params)
    end

    def destroy
      respond_with Post.destroy params[:id]
    end

    def update
      event = Post.find(params[:id])
      event.update(event_params)
      respond_with Post, json: post
    end

    private

    def post_params
      params.permit(:id, :title, :content, :author)
    end
  end
end
