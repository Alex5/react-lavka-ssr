import {Div} from "@shared/ui/div/div";
import {CartSidebar} from "./components/cart-sidebar/cart-sidebar";
import {ProductList} from "./components/product-list/product-list";
import {Text} from "@shared/ui/text/Text";
import type {Route} from "./+types/page"
import type {CategoryData} from "@shared/api/hooks/use-category/use-category.types";
import {useLoaderData} from "react-router";
import {fetcher} from "@shared/api/fetcher";

export async function loader({}: Route.LoaderArgs) {
    const category = await fetcher<CategoryData>('category');

    return {category};
}

export default function RootPage() {
    const {category} = useLoaderData<typeof loader>();

    return (
        <div className="root-page-container">
            <div className="category-list">
                {category?.categories?.[0]?.items?.map((categoryItem) => {
                    const products = categoryItem.items?.map((productItem) => ({
                        id: productItem.value.id,
                        currentPrice: 0,
                        longTitle: productItem.value.longTitle,
                        currentPriceSigned: "",
                        snippetImage: productItem.value.snippetImage,
                    }))

                    return (
                        <Div key={categoryItem.id} className="category-block">
                            <Text fontSize="title4" fontWeight="medium">{categoryItem.value.title}</Text>
                            <ProductList products={products}/>
                        </Div>
                    )
                })}
            </div>
            <div className="cart-sidebar">
                <CartSidebar/>
            </div>
        </div>
    )
}
