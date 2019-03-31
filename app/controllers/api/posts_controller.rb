# frozen_string_literal: true

module Api
  class PostsController < ApplicationController
    respond_to :json

    def index
      respond_with Post.order(created_at: :desc)
    end

    def show
      respond_with Post.find(params[:id])
    rescue ActiveRecord::RecordNotFound => ex
      render json: { error: ex.message }, status: 404
    end

    def create
      respond_with :api, Post.create(post_params)
    end

    def destroy
      respond_with Post.destroy params[:id]
    rescue ActiveRecord::RecordNotFound => ex
      render json: { error: ex.message }, status: 404
    end

    def update
      post = Post.find(params[:id])
      post.update(post_params)
      respond_with Post, json: post
    rescue ActiveRecord::RecordNotFound => ex
      render json: { error: ex.message }, status: 404
    end

    private

    def post_params
      params.permit(:id, :title, :content, :author)
    end
  end
end
