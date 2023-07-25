import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
export declare class ShopsController {
    private readonly shopsService;
    constructor(shopsService: ShopsService);
    create(createShopDto: CreateShopDto): Promise<any>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateShopDto: UpdateShopDto): string;
    remove(id: string): string;
}
