import {ApiUserService} from '../../@core/services/api/api-user.service';
import {IProductModel} from '../../models/page-product.model';
import {ITinderSuggestionId} from '../../models/tinder.model';

export class FavoritesController {
    private isLoading: boolean = false;

    constructor(private apiUserService: ApiUserService) {}

    public async setFavourite(id: ITinderSuggestionId, isFavorite: boolean): Promise<boolean | null> {
        if (this.isLoading) {
            return !isFavorite;
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

    private async addFavourite(id: ITinderSuggestionId): Promise<unknown> {
        const res = await this.apiUserService.addFavorites(id);
        return;
    }

    private async deleteFavourite(id: ITinderSuggestionId): Promise<unknown> {
        if (!!id.feedId) {
            const res = await this.apiUserService.deleteFeedFavorites(id.feedId);
            return res;
        } else if (!!id.tinderId) {
            const res = await this.apiUserService.deleteTinderFavorites(id.tinderId);
            return res;
        }
    }
}
