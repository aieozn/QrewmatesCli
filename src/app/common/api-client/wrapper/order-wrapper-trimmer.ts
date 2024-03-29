import { Trimers } from "app/modules/app-admin/app-menu/trimmer/trimmers"
import { UpdateOrderData, OrderElementData } from "../models"
import { OrderElementDataWrapper } from "./order-element-data-wrapper"
import { OrderWrapper } from "./order-wrapper"

export class OrderWrapperTrimmer {
    static trimOrder(order: OrderWrapper) : UpdateOrderData {
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
    
    public static trimOrderElement(orderElement: OrderElementDataWrapper) : OrderElementData {
        return {
        comment: orderElement.comment ? orderElement.comment : undefined,
        menuItem: {
            ref: orderElement.menuItem.ref
        },
        menuItemSelects: orderElement.menuItemSelects
          .sort((a, b) => a.ref.localeCompare(b.ref))
          .map(elememnt => {
              return {
              ref: elememnt.ref
              }
          }),
        menuItemToppings: orderElement.menuItemToppings
          .sort((a, b) => a.ref.localeCompare(b.ref))
          .map(element => {
            return {
            ref: element.ref
            }
        })
        }
    }
}