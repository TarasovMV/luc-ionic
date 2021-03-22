import {ApiUserService} from '../../@core/services/api/api-user.service';
import {IPageProductModel} from '../../models/page-product.model';

export class FavoritesController {
    private isLoading: boolean = false;

    constructor(private apiUserService: ApiUserService) {}

    public async setFavourite(id: number, isFavorite: boolean): Promise<boolean | null> {
        if (this.isLoading) {
            return null;
        }
        this.isLoading = true;
        try {
            if (isFavorite) {
                await this.addFavourite(id);
                return true;
            } else {
                await this.deleteFavourite(id);
                return false;
            }
        } catch (e) {
            console.error('setFavourite', e);
            return isFavorite;
        } finally {
            this.isLoading = false;
        }
    }

    private async addFavourite(id: number): Promise<IPageProductModel> {
        const res = await this.apiUserService.addFavorites(id);
        return res?.feed;
    }

    private async deleteFavourite(id: number): Promise<unknown> {
        const res = await this.apiUserService.deleteFavorites(id);
        return res;
    }
}
