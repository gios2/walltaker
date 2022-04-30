class CommentsController < ApplicationController
  before_action :set_comment, only: %i[ show edit update destroy ]
  before_action :set_link, only: %i[ new create ]

  # GET /links/1/comments
  def index
    @comments = Comment.all.where(link_id: params['link_id'])
  end

  # GET /comments/1 or /comments/1.json
  def show
  end

  # GET /links/1/comments/new
  def new
    @comment = Comment.new
  end

  # GET /comments/1/edit
  def edit
  end

  # POST /comments or /comments.json
  def create
    @comment = Comment.new(comment_params)
    @comment.link_id = @link.id
    @comment.user_id = current_user.id

    if @comment.save
      redirect_to new_link_comment_url(@link), notice: "Comment was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  # DELETE /comments/1 or /comments/1.json
  def destroy
    @comment.destroy

    respond_to do |format|
      format.html { redirect_to link_comments_url, notice: "Comment was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    def set_link
      @link = Link.find(params[:link_id])
    end

    # Only allow a list of trusted parameters through.
    def comment_params
      params.require(:comment).permit(:content)
    end
end
