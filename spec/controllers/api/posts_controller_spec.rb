require 'rails_helper'

RSpec.describe Api::PostsController, type: :controller do
  let(:post1) { create(:post, created_at: 20.minutes.ago) }
  let(:post2) { create(:post, created_at: 10.minutes.ago) }
  let(:post3) { create(:post, created_at: 2.minutes.ago) }
  before do
    post1
    post2
    post3
  end

  describe 'GET #index' do
    let(:action) { get :index, format: :json }
    let(:expected_response) do
      [
        {
          id: post1.id,
          title: post1.title,
          content: post1.content,
          author: post1.author,
          created_at: post1.created_at.xmlschema(3)
        }.stringify_keys,
        {
          id: post2.id,
          title: post2.title,
          content: post2.content,
          author: post2.author,
          created_at: post2.created_at.xmlschema(3)
        }.stringify_keys,
        {
          id: post3.id,
          title: post3.title,
          content: post3.content,
          author: post3.author,
          created_at: post3.created_at.xmlschema(3)
        }.stringify_keys
      ].reverse
    end

    it 'returns posts ordered by creation date' do
      action
      expect(json_response).to eq(expected_response)
    end
  end

  describe 'POST #create' do
    let(:params) do
      {
        title: 'Title',
        content: 'Blabalabalbala ugabuga',
        author: 'Author'
      }
    end
    let(:action) { post :create, params: params, format: :json }
    let(:expected_response) do
      {
        title: params[:title],
        content: params[:content],
        author: params[:author]
      }.stringify_keys
    end

    it 'returns newly created post' do
      action
      expect(json_response.except('created_at', 'id')).to eq(expected_response)
    end

    context 'when some of the required params are missing' do
      let(:params) do
        {
          title: 'Title',
          content: 'Blabalabalbala ugabuga'
        }
      end

      it 'returns a proper error' do
        action
        expect(json_response.dig('errors', 'author')).to include('can\'t be blank')
      end
    end
  end
end
