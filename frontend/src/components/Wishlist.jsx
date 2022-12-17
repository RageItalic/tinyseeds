import { useEffect } from "react"
import PureModal from "react-pure-modal"
import useWishlistStore from "../store/wishlist"
import CartItem from "./CartItem"


const Wishlist = (props) => {
    const {wishlistOpen, setWishlistOpen} = props
    const wishlist = useWishlistStore(state => state.wishlist)
    const removeFromWishlist = useWishlistStore(state => state.removeFromWishlist)

    return (
        <PureModal
            header={`Your Wishlist`}
            isOpen={wishlistOpen}
            onClose={() => setWishlistOpen(false)}
            width="500px"
            scrollable={true}
            maxHeight={"450px"}
        >
             <div style={{display: "flex", flexDirection: "column", gap: "25px"}}>
                {wishlist.length > 0 
                    ? wishlist.map((item, index) => (
                        <div key={item.id} style={{display: "flex", flexDirection: "row", gap: "20px"}}>
                            <img src={item.imageURLS[0]} style={{flex: "0.2"}} width="auto" height="120px" />
                            <div style={{display: "flex", flexDirection: "column", flex: "0.8"}}>
                                <span style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                    <p>{item.name}</p>
                                    <p onClick={() => removeFromWishlist(wishlist, item.id)}>X</p>
                                </span>
                            </div>
                        </div>
                    ))
                    : <p>Wishlist Empty!</p>
                }
             </div>
        </PureModal>
    )
}

export default Wishlist