# frozen_string_literal: true

module Api
  class PostsController < ApplicationController
    respond_to :json

    def index
      respond_with Post.order(created_at: :desc)
    end

    def show
      respond_with Post.find(post_params[:id])
    end

    private

    def post_params
      params.permit(:id, :title, :description)
    end
  end
end
