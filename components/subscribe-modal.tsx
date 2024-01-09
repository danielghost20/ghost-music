"use client"

import { Price, ProductWithPrice } from "@/types"
import Modal from "./modal"
import Button from "./button"
import { useState } from "react"
import { useUser } from "@/hooks/useUser"
import toast from "react-hot-toast"
import { postData } from "@/helpers/stripe"
import { getStripe } from "@/libs/stripeClient"
import useSubscribeModal from "@/hooks/useSubscribeModal"

interface SubscribeModalProps {
    products: ProductWithPrice[]
}

const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: price.currency,
        maximumFractionDigits: 0
    }).format((price?.unit_amount || 0) / 100)

    return priceString
}

export default function SubscribeModal ({ products }: SubscribeModalProps) {
    
    const subscribeModal = useSubscribeModal()
    const { user, isLoading, subscription } = useUser()
    const [priceIdLoading, setPriceIdLoading] = useState<string>()

    const onChange = (open: boolean) => {
        if (!open) {
            subscribeModal.onClose()
        }
    }

    const handleCheckout =  async (price: Price) => {
        setPriceIdLoading(price.id)

        if (!user) {
            setPriceIdLoading(undefined)
            return toast.error("Mus bet logged in")
        }

        if (subscription) {
            setPriceIdLoading(undefined)
            return toast("Already subscribed")
        }

        try {
            const { sessionId } = await postData({
                url: "/api/create-checkout-session",
                data: {price}
            })

            const stripe = await getStripe()
            stripe?.redirectToCheckout({sessionId})
        } catch (error) {
            toast.error((error as Error).message)
            
        } finally {
            setPriceIdLoading(undefined)
        }
    }

    let content = (
        <div className="text-center">
            No products available
        </div>
    )

    if (products.length) {
        content = (
            <div>
                {products.map((prod) => {
                    if (!prod.prices?.length) {
                        return (
                            <div key={prod.id}>
                                No prices available
                            </div>
                        )
                    }

                    return prod.prices.map((price) => (
                        <Button disabled={isLoading || price.id === priceIdLoading} onClick={() => handleCheckout(price)} key={price.id}>
                            {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
                        </Button>
                    ))
                })}
            </div>
        )
    }

    if (subscription) {
        content  = (
            <div className="text-center">
                Already subscribe
            </div>
        )
    }

    return (
        <Modal isOpen={subscribeModal.isOpen} onChange={onChange} title="Only for premium users" description="Listen to music with Spotify Premium">
            {content}
        </Modal>
    )
}