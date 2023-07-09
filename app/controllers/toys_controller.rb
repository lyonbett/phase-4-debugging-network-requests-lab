class ToysController < ApplicationController
  wrap_parameters format: []

  def index
    toys = Toy.all
    render json: toys
  end

  def create
    toy = Toy.create(toy_params)
    render json: toy, status: :created
  end

  def update
    toy = Toy.find_by(id: params[:id])
    if toy.update(toy_params)
    else
      render json: {error: "Toy not found"}, status: :not_found
    end
  end

  def destroy
    toy = Toy.find_by(id: params[:id])
    toy.destroy
    head :no_content
  end

  private

  def toy_params
    params.permit(:id, :name, :image, :likes)
  end

end
