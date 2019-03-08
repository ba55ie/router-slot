import { html, LitElement, PropertyValues } from "lit-element";
import { TemplateResult } from "lit-html";
import { ROUTER_SLOT_TAG_NAME } from "../../../../lib/config";
import { IRouterSlot, Params } from "../../../../lib/model";
import { queryParentRouterSlot } from "../../../../lib/util/shadow";
import { sharedStyles } from "../../styles";

export default class UserComponent extends LitElement {

	get params (): Params {
		return queryParentRouterSlot(this)!.match!.params;
	}

	firstUpdated (changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		const $routerSlot = this.shadowRoot!.querySelector<IRouterSlot>(ROUTER_SLOT_TAG_NAME)!;
		$routerSlot.add([
			{
				path: "edit",
				component: () => import("./edit/edit")
			}
		]);
	}

	/**
	 * Renders the component.
	 * @returns {TemplateResult}
	 */
	render (): TemplateResult {
		const {user, dashId} = this.params;
		return html`
			<style>
				${sharedStyles}
			</style>
			<p>UserComponent</p>
			<p>:user = <b>${user}</b></p>
			<p>:dashId = <b>${dashId}</b></p>
			<router-link path="edit"><button>Go to EditComponent</button></router-link>
			<router-slot></router-slot>
		`;
	}

}

window.customElements.define("user-component", UserComponent);
