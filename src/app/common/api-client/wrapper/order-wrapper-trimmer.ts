import { Trimers } from "app/modules/app-admin/app-menu/trimmer/trimmers"
import { OrderData, OrderElementData } from "../models"
import { OrderElementDataWrapper } from "./order-element-data-wrapper"
import { OrderWrapper } from "./order-wrapper"

export class OrderWrapperTrimmer {
    static trimOrder(order: OrderWrapper) : OrderData {
        return {
          comment: order.comment ? order.comment : undefined,
          elements: order.activeElements.map(e => this.trimOrderElement(e)),
          elementsRefs: order.elements.map(e => Trimers.trimRef(e)),
          paymentMethod: order.paymentMethod,
          table: {
            ref: order.table.ref
          }
        }
      }
    
    private static trimOrderElement(orderElement: OrderElementDataWrapper) : OrderElementData {
        return {
        comment: orderElement.comment ? orderElement.comment : undefined,
        menuItem: {
            ref: orderElement.menuItem.ref
        },
        menuItemSelects: orderElement.menuItemSelects.map(elememnt => {
            return {
            ref: elememnt.ref
            }
        }),
        menuItemToppings: orderElement.menuItemToppings.map(element => {
            return {
            ref: element.ref
            }
        })
        }
    }
}