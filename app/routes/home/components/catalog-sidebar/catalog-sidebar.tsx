import {useCategory} from "@shared/api/hooks/use-category/use-category";

export function CatalogSidebar() {
    const {category} = useCategory()

    return (
        <div>CatalogSidebar</div>
    );
}
