class GroupsController < ApplicationController
  def new
  end

  def create
  end

  def edit
  end

  def update
  end

  private

  def group_params
    params.require(:group).permit(:name)
  end
  

end
