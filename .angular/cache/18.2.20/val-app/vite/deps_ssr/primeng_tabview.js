import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ConnectedOverlayScrollHandler,
  Ripple,
  TimesIcon
} from "./chunk-422KSOEP.js";
import {
  BaseComponent
} from "./chunk-6LQYXHG6.js";
import {
  BaseStyle
} from "./chunk-7ESJXRVJ.js";
import {
  PrimeTemplate,
  SharedModule,
  appendChild,
  fadeIn,
  find,
  findSingle,
  focus,
  getAttribute,
  getOffset,
  getOuterHeight,
  getOuterWidth,
  getViewport,
  getWidth,
  getWindowScrollLeft,
  getWindowScrollTop,
  hasClass,
  removeChild,
  uuid
} from "./chunk-LUT5V6Q5.js";
import {
  CommonModule,
  NgClass,
  NgIf,
  NgStyle,
  NgTemplateOutlet,
  isPlatformBrowser
} from "./chunk-2Y7F4HLK.js";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  EventEmitter,
  HostBinding,
  Injectable,
  Input,
  NgModule,
  NgZone,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation$1,
  booleanAttribute,
  forwardRef,
  inject,
  numberAttribute,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵInputTransformsFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsetNgModuleScope,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-XGQE27FZ.js";
import "./chunk-7GF5BRHJ.js";
import {
  __spreadValues
} from "./chunk-NQ4HTGF6.js";

// node_modules/primeng/fesm2022/primeng-utils.mjs
function ZIndexUtils() {
  let zIndexes = [];
  const generateZIndex = (key, baseZIndex) => {
    let lastZIndex = zIndexes.length > 0 ? zIndexes[zIndexes.length - 1] : {
      key,
      value: baseZIndex
    };
    let newZIndex = lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 2;
    zIndexes.push({
      key,
      value: newZIndex
    });
    return newZIndex;
  };
  const revertZIndex = (zIndex) => {
    zIndexes = zIndexes.filter((obj) => obj.value !== zIndex);
  };
  const getCurrentZIndex = () => {
    return zIndexes.length > 0 ? zIndexes[zIndexes.length - 1].value : 0;
  };
  const getZIndex = (el) => {
    return el ? parseInt(el.style.zIndex, 10) || 0 : 0;
  };
  return {
    get: getZIndex,
    set: (key, el, baseZIndex) => {
      if (el) {
        el.style.zIndex = String(generateZIndex(key, baseZIndex));
      }
    },
    clear: (el) => {
      if (el) {
        revertZIndex(getZIndex(el));
        el.style.zIndex = "";
      }
    },
    getCurrent: () => getCurrentZIndex()
  };
}
var zindexutils = ZIndexUtils();

// node_modules/primeng/fesm2022/primeng-tooltip.mjs
var theme = ({
  dt
}) => `
.p-tooltip {
    position: absolute;
    display: none;
    max-width: ${dt("tooltip.max.width")};
}

.p-tooltip-right,
.p-tooltip-left {
    padding: 0 ${dt("tooltip.gutter")};
}

.p-tooltip-top,
.p-tooltip-bottom {
    padding: ${dt("tooltip.gutter")} 0;
}

.p-tooltip-text {
    white-space: pre-line;
    word-break: break-word;
    background: ${dt("tooltip.background")};
    color: ${dt("tooltip.color")};
    padding: ${dt("tooltip.padding")};
    box-shadow: ${dt("tooltip.shadow")};
    border-radius: ${dt("tooltip.border.radius")};
}

.p-tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    scale: 2;
}

.p-tooltip-right .p-tooltip-arrow {
    top: 50%;
    left: 0;
    margin-top: calc(-1 * ${dt("tooltip.gutter")});
    border-width: ${dt("tooltip.gutter")} ${dt("tooltip.gutter")} ${dt("tooltip.gutter")} 0;
    border-right-color: ${dt("tooltip.background")};
}

.p-tooltip-left .p-tooltip-arrow {
    top: 50%;
    right: 0;
    margin-top: calc(-1 * ${dt("tooltip.gutter")});
    border-width: ${dt("tooltip.gutter")} 0 ${dt("tooltip.gutter")} ${dt("tooltip.gutter")};
    border-left-color: ${dt("tooltip.background")};
}

.p-tooltip-top .p-tooltip-arrow {
    bottom: 0;
    left: 50%;
    margin-left: calc(-1 * ${dt("tooltip.gutter")});
    border-width: ${dt("tooltip.gutter")} ${dt("tooltip.gutter")} 0 ${dt("tooltip.gutter")};
    border-top-color: ${dt("tooltip.background")};
    border-bottom-color: ${dt("tooltip.background")};
}

.p-tooltip-bottom .p-tooltip-arrow {
    top: 0;
    left: 50%;
    margin-left: calc(-1 * ${dt("tooltip.gutter")});
    border-width: 0 ${dt("tooltip.gutter")} ${dt("tooltip.gutter")} ${dt("tooltip.gutter")};
    border-top-color: ${dt("tooltip.background")};
    border-bottom-color: ${dt("tooltip.background")};
}
`;
var classes = {
  root: "p-tooltip p-component",
  arrow: "p-tooltip-arrow",
  text: "p-tooltip-text"
};
var TooltipStyle = class _TooltipStyle extends BaseStyle {
  name = "tooltip";
  theme = theme;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTooltipStyle_BaseFactory;
    return function TooltipStyle_Factory(__ngFactoryType__) {
      return (ɵTooltipStyle_BaseFactory || (ɵTooltipStyle_BaseFactory = ɵɵgetInheritedFactory(_TooltipStyle)))(__ngFactoryType__ || _TooltipStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _TooltipStyle,
    factory: _TooltipStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipStyle, [{
    type: Injectable
  }], null, null);
})();
var TooltipClasses;
(function(TooltipClasses2) {
  TooltipClasses2["root"] = "p-tooltip";
  TooltipClasses2["arrow"] = "p-tooltip-arrow";
  TooltipClasses2["text"] = "p-tooltip-text";
})(TooltipClasses || (TooltipClasses = {}));
var Tooltip = class _Tooltip extends BaseComponent {
  zone;
  viewContainer;
  /**
   * Position of the tooltip.
   * @group Props
   */
  tooltipPosition;
  /**
   * Event to show the tooltip.
   * @group Props
   */
  tooltipEvent = "hover";
  /**
   *  Target element to attach the overlay, valid values are "body", "target" or a local ng-F variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
   * @group Props
   */
  appendTo;
  /**
   * Type of CSS position.
   * @group Props
   */
  positionStyle;
  /**
   * Style class of the tooltip.
   * @group Props
   */
  tooltipStyleClass;
  /**
   * Whether the z-index should be managed automatically to always go on top or have a fixed value.
   * @group Props
   */
  tooltipZIndex;
  /**
   * By default the tooltip contents are rendered as text. Set to false to support html tags in the content.
   * @group Props
   */
  escape = true;
  /**
   * Delay to show the tooltip in milliseconds.
   * @group Props
   */
  showDelay;
  /**
   * Delay to hide the tooltip in milliseconds.
   * @group Props
   */
  hideDelay;
  /**
   * Time to wait in milliseconds to hide the tooltip even it is active.
   * @group Props
   */
  life;
  /**
   * Specifies the additional vertical offset of the tooltip from its default position.
   * @group Props
   */
  positionTop;
  /**
   * Specifies the additional horizontal offset of the tooltip from its default position.
   * @group Props
   */
  positionLeft;
  /**
   * Whether to hide tooltip when hovering over tooltip content.
   * @group Props
   */
  autoHide = true;
  /**
   * Automatically adjusts the element position when there is not enough space on the selected position.
   * @group Props
   */
  fitContent = true;
  /**
   * Whether to hide tooltip on escape key press.
   * @group Props
   */
  hideOnEscape = true;
  /**
   * Content of the tooltip.
   * @group Props
   */
  content;
  /**
   * When present, it specifies that the component should be disabled.
   * @defaultValue false
   * @group Props
   */
  get disabled() {
    return this._disabled;
  }
  set disabled(val) {
    this._disabled = val;
    this.deactivate();
  }
  /**
   * Specifies the tooltip configuration options for the component.
   * @group Props
   */
  tooltipOptions;
  _tooltipOptions = {
    tooltipLabel: null,
    tooltipPosition: "right",
    tooltipEvent: "hover",
    appendTo: "body",
    positionStyle: null,
    tooltipStyleClass: null,
    tooltipZIndex: "auto",
    escape: true,
    disabled: null,
    showDelay: null,
    hideDelay: null,
    positionTop: null,
    positionLeft: null,
    life: null,
    autoHide: true,
    hideOnEscape: true,
    id: uuid("pn_id_") + "_tooltip"
  };
  _disabled;
  container;
  styleClass;
  tooltipText;
  showTimeout;
  hideTimeout;
  active;
  mouseEnterListener;
  mouseLeaveListener;
  containerMouseleaveListener;
  clickListener;
  focusListener;
  blurListener;
  documentEscapeListener;
  scrollHandler;
  resizeListener;
  _componentStyle = inject(TooltipStyle);
  interactionInProgress = false;
  constructor(zone, viewContainer) {
    super();
    this.zone = zone;
    this.viewContainer = viewContainer;
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        const tooltipEvent = this.getOption("tooltipEvent");
        if (tooltipEvent === "hover" || tooltipEvent === "both") {
          this.mouseEnterListener = this.onMouseEnter.bind(this);
          this.mouseLeaveListener = this.onMouseLeave.bind(this);
          this.clickListener = this.onInputClick.bind(this);
          this.el.nativeElement.addEventListener("mouseenter", this.mouseEnterListener);
          this.el.nativeElement.addEventListener("click", this.clickListener);
          this.el.nativeElement.addEventListener("mouseleave", this.mouseLeaveListener);
        }
        if (tooltipEvent === "focus" || tooltipEvent === "both") {
          this.focusListener = this.onFocus.bind(this);
          this.blurListener = this.onBlur.bind(this);
          let target = this.el.nativeElement.querySelector(".p-component");
          if (!target) {
            target = this.getTarget(this.el.nativeElement);
          }
          target.addEventListener("focus", this.focusListener);
          target.addEventListener("blur", this.blurListener);
        }
      });
    }
  }
  ngOnChanges(simpleChange) {
    super.ngOnChanges(simpleChange);
    if (simpleChange.tooltipPosition) {
      this.setOption({
        tooltipPosition: simpleChange.tooltipPosition.currentValue
      });
    }
    if (simpleChange.tooltipEvent) {
      this.setOption({
        tooltipEvent: simpleChange.tooltipEvent.currentValue
      });
    }
    if (simpleChange.appendTo) {
      this.setOption({
        appendTo: simpleChange.appendTo.currentValue
      });
    }
    if (simpleChange.positionStyle) {
      this.setOption({
        positionStyle: simpleChange.positionStyle.currentValue
      });
    }
    if (simpleChange.tooltipStyleClass) {
      this.setOption({
        tooltipStyleClass: simpleChange.tooltipStyleClass.currentValue
      });
    }
    if (simpleChange.tooltipZIndex) {
      this.setOption({
        tooltipZIndex: simpleChange.tooltipZIndex.currentValue
      });
    }
    if (simpleChange.escape) {
      this.setOption({
        escape: simpleChange.escape.currentValue
      });
    }
    if (simpleChange.showDelay) {
      this.setOption({
        showDelay: simpleChange.showDelay.currentValue
      });
    }
    if (simpleChange.hideDelay) {
      this.setOption({
        hideDelay: simpleChange.hideDelay.currentValue
      });
    }
    if (simpleChange.life) {
      this.setOption({
        life: simpleChange.life.currentValue
      });
    }
    if (simpleChange.positionTop) {
      this.setOption({
        positionTop: simpleChange.positionTop.currentValue
      });
    }
    if (simpleChange.positionLeft) {
      this.setOption({
        positionLeft: simpleChange.positionLeft.currentValue
      });
    }
    if (simpleChange.disabled) {
      this.setOption({
        disabled: simpleChange.disabled.currentValue
      });
    }
    if (simpleChange.content) {
      this.setOption({
        tooltipLabel: simpleChange.content.currentValue
      });
      if (this.active) {
        if (simpleChange.content.currentValue) {
          if (this.container && this.container.offsetParent) {
            this.updateText();
            this.align();
          } else {
            this.show();
          }
        } else {
          this.hide();
        }
      }
    }
    if (simpleChange.autoHide) {
      this.setOption({
        autoHide: simpleChange.autoHide.currentValue
      });
    }
    if (simpleChange.id) {
      this.setOption({
        id: simpleChange.id.currentValue
      });
    }
    if (simpleChange.tooltipOptions) {
      this._tooltipOptions = __spreadValues(__spreadValues({}, this._tooltipOptions), simpleChange.tooltipOptions.currentValue);
      this.deactivate();
      if (this.active) {
        if (this.getOption("tooltipLabel")) {
          if (this.container && this.container.offsetParent) {
            this.updateText();
            this.align();
          } else {
            this.show();
          }
        } else {
          this.hide();
        }
      }
    }
  }
  isAutoHide() {
    return this.getOption("autoHide");
  }
  onMouseEnter(e) {
    if (!this.container && !this.showTimeout) {
      this.activate();
    }
  }
  onMouseLeave(e) {
    if (!this.isAutoHide()) {
      const valid = hasClass(e.relatedTarget, "p-tooltip") || hasClass(e.relatedTarget, "p-tooltip-text") || hasClass(e.relatedTarget, "p-tooltip-arrow");
      !valid && this.deactivate();
    } else {
      this.deactivate();
    }
  }
  onFocus(e) {
    this.activate();
  }
  onBlur(e) {
    this.deactivate();
  }
  onInputClick(e) {
    this.deactivate();
  }
  activate() {
    if (!this.interactionInProgress) {
      this.active = true;
      this.clearHideTimeout();
      if (this.getOption("showDelay")) this.showTimeout = setTimeout(() => {
        this.show();
      }, this.getOption("showDelay"));
      else this.show();
      if (this.getOption("life")) {
        let duration = this.getOption("showDelay") ? this.getOption("life") + this.getOption("showDelay") : this.getOption("life");
        this.hideTimeout = setTimeout(() => {
          this.hide();
        }, duration);
      }
      if (this.getOption("hideOnEscape")) {
        this.documentEscapeListener = this.renderer.listen("document", "keydown.escape", () => {
          this.deactivate();
          this.documentEscapeListener();
        });
      }
      this.interactionInProgress = true;
    }
  }
  deactivate() {
    this.interactionInProgress = false;
    this.active = false;
    this.clearShowTimeout();
    if (this.getOption("hideDelay")) {
      this.clearHideTimeout();
      this.hideTimeout = setTimeout(() => {
        this.hide();
      }, this.getOption("hideDelay"));
    } else {
      this.hide();
    }
    if (this.documentEscapeListener) {
      this.documentEscapeListener();
    }
  }
  create() {
    if (this.container) {
      this.clearHideTimeout();
      this.remove();
    }
    this.container = document.createElement("div");
    this.container.setAttribute("id", this.getOption("id"));
    this.container.setAttribute("role", "tooltip");
    let tooltipArrow = document.createElement("div");
    tooltipArrow.className = "p-tooltip-arrow";
    this.container.appendChild(tooltipArrow);
    this.tooltipText = document.createElement("div");
    this.tooltipText.className = "p-tooltip-text";
    this.updateText();
    if (this.getOption("positionStyle")) {
      this.container.style.position = this.getOption("positionStyle");
    }
    this.container.appendChild(this.tooltipText);
    if (this.getOption("appendTo") === "body") document.body.appendChild(this.container);
    else if (this.getOption("appendTo") === "target") appendChild(this.container, this.el.nativeElement);
    else appendChild(this.getOption("appendTo"), this.container);
    this.container.style.display = "none";
    if (this.fitContent) {
      this.container.style.width = "fit-content";
    }
    if (this.isAutoHide()) {
      this.container.style.pointerEvents = "none";
    } else {
      this.container.style.pointerEvents = "unset";
      this.bindContainerMouseleaveListener();
    }
  }
  bindContainerMouseleaveListener() {
    if (!this.containerMouseleaveListener) {
      const targetEl = this.container ?? this.container.nativeElement;
      this.containerMouseleaveListener = this.renderer.listen(targetEl, "mouseleave", (e) => {
        this.deactivate();
      });
    }
  }
  unbindContainerMouseleaveListener() {
    if (this.containerMouseleaveListener) {
      this.bindContainerMouseleaveListener();
      this.containerMouseleaveListener = null;
    }
  }
  show() {
    if (!this.getOption("tooltipLabel") || this.getOption("disabled")) {
      return;
    }
    this.create();
    const nativeElement = this.el.nativeElement;
    const pDialogWrapper = nativeElement.closest("p-dialog");
    if (pDialogWrapper) {
      setTimeout(() => {
        this.container && (this.container.style.display = "inline-block");
        this.container && this.align();
      }, 100);
    } else {
      this.container.style.display = "inline-block";
      this.align();
    }
    fadeIn(this.container, 250);
    if (this.getOption("tooltipZIndex") === "auto") zindexutils.set("tooltip", this.container, this.config.zIndex.tooltip);
    else this.container.style.zIndex = this.getOption("tooltipZIndex");
    this.bindDocumentResizeListener();
    this.bindScrollListener();
  }
  hide() {
    if (this.getOption("tooltipZIndex") === "auto") {
      zindexutils.clear(this.container);
    }
    this.remove();
  }
  updateText() {
    const content = this.getOption("tooltipLabel");
    if (content instanceof TemplateRef) {
      const embeddedViewRef = this.viewContainer.createEmbeddedView(content);
      embeddedViewRef.detectChanges();
      embeddedViewRef.rootNodes.forEach((node) => this.tooltipText.appendChild(node));
    } else if (this.getOption("escape")) {
      this.tooltipText.innerHTML = "";
      this.tooltipText.appendChild(document.createTextNode(content));
    } else {
      this.tooltipText.innerHTML = content;
    }
  }
  align() {
    let position = this.getOption("tooltipPosition");
    const positionPriority = {
      top: [this.alignTop, this.alignBottom, this.alignRight, this.alignLeft],
      bottom: [this.alignBottom, this.alignTop, this.alignRight, this.alignLeft],
      left: [this.alignLeft, this.alignRight, this.alignTop, this.alignBottom],
      right: [this.alignRight, this.alignLeft, this.alignTop, this.alignBottom]
    };
    for (let [index, alignmentFn] of positionPriority[position].entries()) {
      if (index === 0) alignmentFn.call(this);
      else if (this.isOutOfBounds()) alignmentFn.call(this);
      else break;
    }
  }
  getHostOffset() {
    if (this.getOption("appendTo") === "body" || this.getOption("appendTo") === "target") {
      let offset = this.el.nativeElement.getBoundingClientRect();
      let targetLeft = offset.left + getWindowScrollLeft();
      let targetTop = offset.top + getWindowScrollTop();
      return {
        left: targetLeft,
        top: targetTop
      };
    } else {
      return {
        left: 0,
        top: 0
      };
    }
  }
  get activeElement() {
    return this.el.nativeElement.nodeName.includes("P-") ? findSingle(this.el.nativeElement, ".p-component") : this.el.nativeElement;
  }
  alignRight() {
    this.preAlign("right");
    const el = this.activeElement;
    const offsetLeft = getOuterWidth(el);
    const offsetTop = (getOuterHeight(el) - getOuterHeight(this.container)) / 2;
    this.alignTooltip(offsetLeft, offsetTop);
  }
  alignLeft() {
    this.preAlign("left");
    let offsetLeft = getOuterWidth(this.container);
    let offsetTop = (getOuterHeight(this.el.nativeElement) - getOuterHeight(this.container)) / 2;
    this.alignTooltip(-offsetLeft, offsetTop);
  }
  alignTop() {
    this.preAlign("top");
    let offsetLeft = (getOuterWidth(this.el.nativeElement) - getOuterWidth(this.container)) / 2;
    let offsetTop = getOuterHeight(this.container);
    this.alignTooltip(offsetLeft, -offsetTop);
  }
  alignBottom() {
    this.preAlign("bottom");
    let offsetLeft = (getOuterWidth(this.el.nativeElement) - getOuterWidth(this.container)) / 2;
    let offsetTop = getOuterHeight(this.el.nativeElement);
    this.alignTooltip(offsetLeft, offsetTop);
  }
  alignTooltip(offsetLeft, offsetTop) {
    let hostOffset = this.getHostOffset();
    let left = hostOffset.left + offsetLeft;
    let top = hostOffset.top + offsetTop;
    this.container.style.left = left + this.getOption("positionLeft") + "px";
    this.container.style.top = top + this.getOption("positionTop") + "px";
  }
  setOption(option) {
    this._tooltipOptions = __spreadValues(__spreadValues({}, this._tooltipOptions), option);
  }
  getOption(option) {
    return this._tooltipOptions[option];
  }
  getTarget(el) {
    return hasClass(el, "p-inputwrapper") ? findSingle(el, "input") : el;
  }
  preAlign(position) {
    this.container.style.left = "-999px";
    this.container.style.top = "-999px";
    let defaultClassName = "p-tooltip p-component p-tooltip-" + position;
    this.container.className = this.getOption("tooltipStyleClass") ? defaultClassName + " " + this.getOption("tooltipStyleClass") : defaultClassName;
  }
  isOutOfBounds() {
    let offset = this.container.getBoundingClientRect();
    let targetTop = offset.top;
    let targetLeft = offset.left;
    let width = getOuterWidth(this.container);
    let height = getOuterHeight(this.container);
    let viewport = getViewport();
    return targetLeft + width > viewport.width || targetLeft < 0 || targetTop < 0 || targetTop + height > viewport.height;
  }
  onWindowResize(e) {
    this.hide();
  }
  bindDocumentResizeListener() {
    this.zone.runOutsideAngular(() => {
      this.resizeListener = this.onWindowResize.bind(this);
      window.addEventListener("resize", this.resizeListener);
    });
  }
  unbindDocumentResizeListener() {
    if (this.resizeListener) {
      window.removeEventListener("resize", this.resizeListener);
      this.resizeListener = null;
    }
  }
  bindScrollListener() {
    if (!this.scrollHandler) {
      this.scrollHandler = new ConnectedOverlayScrollHandler(this.el.nativeElement, () => {
        if (this.container) {
          this.hide();
        }
      });
    }
    this.scrollHandler.bindScrollListener();
  }
  unbindScrollListener() {
    if (this.scrollHandler) {
      this.scrollHandler.unbindScrollListener();
    }
  }
  unbindEvents() {
    const tooltipEvent = this.getOption("tooltipEvent");
    if (tooltipEvent === "hover" || tooltipEvent === "both") {
      this.el.nativeElement.removeEventListener("mouseenter", this.mouseEnterListener);
      this.el.nativeElement.removeEventListener("mouseleave", this.mouseLeaveListener);
      this.el.nativeElement.removeEventListener("click", this.clickListener);
    }
    if (tooltipEvent === "focus" || tooltipEvent === "both") {
      let target = this.el.nativeElement.querySelector(".p-component");
      if (!target) {
        target = this.getTarget(this.el.nativeElement);
      }
      target.removeEventListener("focus", this.focusListener);
      target.removeEventListener("blur", this.blurListener);
    }
    this.unbindDocumentResizeListener();
  }
  remove() {
    if (this.container && this.container.parentElement) {
      if (this.getOption("appendTo") === "body") document.body.removeChild(this.container);
      else if (this.getOption("appendTo") === "target") this.el.nativeElement.removeChild(this.container);
      else removeChild(this.container, this.getOption("appendTo"));
    }
    this.unbindDocumentResizeListener();
    this.unbindScrollListener();
    this.unbindContainerMouseleaveListener();
    this.clearTimeouts();
    this.container = null;
    this.scrollHandler = null;
  }
  clearShowTimeout() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
  }
  clearHideTimeout() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }
  clearTimeouts() {
    this.clearShowTimeout();
    this.clearHideTimeout();
  }
  ngOnDestroy() {
    this.unbindEvents();
    super.ngOnDestroy();
    if (this.container) {
      zindexutils.clear(this.container);
    }
    this.remove();
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    if (this.documentEscapeListener) {
      this.documentEscapeListener();
    }
  }
  static ɵfac = function Tooltip_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Tooltip)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ViewContainerRef));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _Tooltip,
    selectors: [["", "pTooltip", ""]],
    inputs: {
      tooltipPosition: "tooltipPosition",
      tooltipEvent: "tooltipEvent",
      appendTo: "appendTo",
      positionStyle: "positionStyle",
      tooltipStyleClass: "tooltipStyleClass",
      tooltipZIndex: "tooltipZIndex",
      escape: [2, "escape", "escape", booleanAttribute],
      showDelay: [2, "showDelay", "showDelay", numberAttribute],
      hideDelay: [2, "hideDelay", "hideDelay", numberAttribute],
      life: [2, "life", "life", numberAttribute],
      positionTop: [2, "positionTop", "positionTop", numberAttribute],
      positionLeft: [2, "positionLeft", "positionLeft", numberAttribute],
      autoHide: [2, "autoHide", "autoHide", booleanAttribute],
      fitContent: [2, "fitContent", "fitContent", booleanAttribute],
      hideOnEscape: [2, "hideOnEscape", "hideOnEscape", booleanAttribute],
      content: [0, "pTooltip", "content"],
      disabled: [0, "tooltipDisabled", "disabled"],
      tooltipOptions: "tooltipOptions"
    },
    standalone: true,
    features: [ɵɵProvidersFeature([TooltipStyle]), ɵɵInputTransformsFeature, ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Tooltip, [{
    type: Directive,
    args: [{
      selector: "[pTooltip]",
      standalone: true,
      providers: [TooltipStyle]
    }]
  }], () => [{
    type: NgZone
  }, {
    type: ViewContainerRef
  }], {
    tooltipPosition: [{
      type: Input
    }],
    tooltipEvent: [{
      type: Input
    }],
    appendTo: [{
      type: Input
    }],
    positionStyle: [{
      type: Input
    }],
    tooltipStyleClass: [{
      type: Input
    }],
    tooltipZIndex: [{
      type: Input
    }],
    escape: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showDelay: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    hideDelay: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    life: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    positionTop: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    positionLeft: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    autoHide: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    fitContent: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    hideOnEscape: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    content: [{
      type: Input,
      args: ["pTooltip"]
    }],
    disabled: [{
      type: Input,
      args: ["tooltipDisabled"]
    }],
    tooltipOptions: [{
      type: Input
    }]
  });
})();
var TooltipModule = class _TooltipModule {
  static ɵfac = function TooltipModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TooltipModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _TooltipModule
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipModule, [{
    type: NgModule,
    args: [{
      imports: [Tooltip],
      exports: [Tooltip]
    }]
  }], null, null);
})();
(function() {
  (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(TooltipModule, {
    imports: [Tooltip],
    exports: [Tooltip]
  });
})();

// node_modules/primeng/fesm2022/primeng-tabview.mjs
var theme2 = ({
  dt
}) => `
.p-tabs {
    display: flex;
    flex-direction: column;
}

.p-tablist {
    display: flex;
    position: relative;
}

.p-tabs-scrollable > .p-tablist {
    overflow: hidden;
}

.p-tablist-viewport {
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    scrollbar-width: none;
    overscroll-behavior: contain auto;
}

.p-tablist-viewport::-webkit-scrollbar {
    display: none;
}

.p-tablist-tab-list {
    position: relative;
    display: flex;
    background: ${dt("tabs.tablist.background")};
    border-style: solid;
    border-color: ${dt("tabs.tablist.border.color")};
    border-width: ${dt("tabs.tablist.border.width")};
}

.p-tablist-content {
    flex-grow: 1;
}

.p-tablist-nav-button {
    all: unset;
    position: absolute !important;
    flex-shrink: 0;
    top: 0;
    z-index: 2;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${dt("tabs.nav.button.background")};
    color: ${dt("tabs.nav.button.color")};
    width: ${dt("tabs.nav.button.width")};
    transition: color ${dt("tabs.transition.duration")}, outline-color ${dt("tabs.transition.duration")}, box-shadow ${dt("tabs.transition.duration")};
    box-shadow: ${dt("tabs.nav.button.shadow")};
    outline-color: transparent;
    cursor: pointer;
}

.p-tablist-nav-button:focus-visible {
    z-index: 1;
    box-shadow: ${dt("tabs.nav.button.focus.ring.shadow")};
    outline: ${dt("tabs.nav.button.focus.ring.width")} ${dt("tabs.nav.button.focus.ring.style")} ${dt("tabs.nav.button.focus.ring.color")};
    outline-offset: ${dt("tabs.nav.button.focus.ring.offset")};
}

.p-tablist-nav-button:hover {
    color: ${dt("tabs.nav.button.hover.color")};
}

.p-tablist-prev-button {
    left: 0;
}

.p-tablist-next-button {
    right: 0;
}

.p-tab {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    cursor: pointer;
    user-select: none;
    position: relative;
    border-style: solid;
    white-space: nowrap;
    gap: ${dt("tabs.tab.gap")};
    background: ${dt("tabs.tab.background")};
    border-width: ${dt("tabs.tab.border.width")};
    border-color: ${dt("tabs.tab.border.color")};
    color: ${dt("tabs.tab.color")};
    padding: ${dt("tabs.tab.padding")};
    font-weight: ${dt("tabs.tab.font.weight")};
    transition: background ${dt("tabs.transition.duration")}, border-color ${dt("tabs.transition.duration")}, color ${dt("tabs.transition.duration")}, outline-color ${dt("tabs.transition.duration")}, box-shadow ${dt("tabs.transition.duration")};
    margin: ${dt("tabs.tab.margin")};
    outline-color: transparent;
}

.p-tab:not(.p-disabled):focus-visible {
    z-index: 1;
    box-shadow: ${dt("tabs.tab.focus.ring.shadow")};
    outline: ${dt("tabs.tab.focus.ring.width")} ${dt("tabs.tab.focus.ring.style")} ${dt("tabs.tab.focus.ring.color")};
    outline-offset: ${dt("tabs.tab.focus.ring.offset")};
}

.p-tab:not(.p-tab-active):not(.p-disabled):hover {
    background: ${dt("tabs.tab.hover.background")};
    border-color: ${dt("tabs.tab.hover.border.color")};
    color: ${dt("tabs.tab.hover.color")};
}

.p-tab-active {
    background: ${dt("tabs.tab.active.background")};
    border-color: ${dt("tabs.tab.active.border.color")};
    color: ${dt("tabs.tab.active.color")};
}

.p-tabpanels {
    background: ${dt("tabs.tabpanel.background")};
    color: ${dt("tabs.tabpanel.color")};
    padding: ${dt("tabs.tabpanel.padding")};
    outline: 0 none;
}

.p-tabpanel:focus-visible {
    box-shadow: ${dt("tabs.tabpanel.focus.ring.shadow")};
    outline: ${dt("tabs.tabpanel.focus.ring.width")} ${dt("tabs.tabpanel.focus.ring.style")} ${dt("tabs.tabpanel.focus.ring.color")};
    outline-offset: ${dt("tabs.tabpanel.focus.ring.offset")};
}

.p-tablist-active-bar {
    z-index: 1;
    display: block;
    position: absolute;
    bottom: ${dt("tabs.active.bar.bottom")};
    height: ${dt("tabs.active.bar.height")};
    background: ${dt("tabs.active.bar.background")};
    transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);
}
`;
var classes2 = {
  root: ({
    props
  }) => ["p-tabs p-component", {
    "p-tabs-scrollable": props.scrollable
  }]
};
var TabsStyle = class _TabsStyle extends BaseStyle {
  name = "tabs";
  theme = theme2;
  classes = classes2;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTabsStyle_BaseFactory;
    return function TabsStyle_Factory(__ngFactoryType__) {
      return (ɵTabsStyle_BaseFactory || (ɵTabsStyle_BaseFactory = ɵɵgetInheritedFactory(_TabsStyle)))(__ngFactoryType__ || _TabsStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _TabsStyle,
    factory: _TabsStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabsStyle, [{
    type: Injectable
  }], null, null);
})();
var TabsClasses;
(function(TabsClasses2) {
  TabsClasses2["root"] = "p-tabs";
  TabsClasses2["list"] = "p-tablist";
  TabsClasses2["content"] = "p-tablist-content";
  TabsClasses2["tablist"] = "p-tablist-tab-list";
  TabsClasses2["tab"] = "p-tab";
  TabsClasses2["inkbar"] = "p-tablist-active-bar";
  TabsClasses2["button"] = "p-tablist-nav-button";
  TabsClasses2["tabpanels"] = "p-tabpanels";
  TabsClasses2["tabpanel"] = "p-tabs-panel";
})(TabsClasses || (TabsClasses = {}));
var _c0 = ["content"];
var _c1 = ["header"];
var _c2 = ["lefticon"];
var _c3 = ["righticon"];
var _c4 = ["closeicon"];
var _c5 = ["*"];
function TabPanel_div_0_ng_container_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function TabPanel_div_0_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, TabPanel_div_0_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 3);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.contentTemplate || ctx_r0._contentTemplate);
  }
}
function TabPanel_div_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 1);
    ɵɵprojection(1);
    ɵɵtemplate(2, TabPanel_div_0_ng_container_2_Template, 2, 1, "ng-container", 2);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("hidden", !ctx_r0.selected);
    ɵɵattribute("id", ctx_r0.tabView.getTabContentId(ctx_r0.id))("aria-hidden", !ctx_r0.selected)("aria-labelledby", ctx_r0.tabView.getTabHeaderActionId(ctx_r0.id))("data-pc-name", "tabpanel");
    ɵɵadvance(2);
    ɵɵproperty("ngIf", (ctx_r0.contentTemplate || ctx_r0._contentTemplate) && (ctx_r0.cache ? ctx_r0.loaded : ctx_r0.selected));
  }
}
var _c6 = ["previousicon"];
var _c7 = ["nexticon"];
var _c8 = ["navbar"];
var _c9 = ["prevBtn"];
var _c10 = ["nextBtn"];
var _c11 = ["inkbar"];
var _c12 = ["elementToObserve"];
var _c13 = (a0) => ({
  "p-tablist-viewport": a0
});
var _c14 = (a0, a1) => ({
  "p-tab": true,
  "p-tab-active": a0,
  "p-disabled": a1
});
function TabView_button_2_ChevronLeftIcon_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "ChevronLeftIcon");
  }
  if (rf & 2) {
    ɵɵattribute("aria-hidden", true);
  }
}
function TabView_button_2_3_ng_template_0_Template(rf, ctx) {
}
function TabView_button_2_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, TabView_button_2_3_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function TabView_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 12, 3);
    ɵɵlistener("click", function TabView_button_2_Template_button_click_0_listener() {
      ɵɵrestoreView(_r2);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.navBackward());
    });
    ɵɵtemplate(2, TabView_button_2_ChevronLeftIcon_2_Template, 1, 1, "ChevronLeftIcon", 13)(3, TabView_button_2_3_Template, 1, 0, null, 14);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵattribute("tabindex", ctx_r2.tabindex)("aria-label", ctx_r2.prevButtonAriaLabel);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", !ctx_r2.previousIconTemplate && !ctx_r2._previousIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r2.previousIconTemplate && ctx_r2._previousIconTemplate);
  }
}
function TabView_For_8_Conditional_0_Conditional_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function TabView_For_8_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, TabView_For_8_Conditional_0_Conditional_1_ng_container_0_Template, 1, 0, "ng-container", 14);
  }
  if (rf & 2) {
    const tab_r5 = ɵɵnextContext(2).$implicit;
    ɵɵproperty("ngTemplateOutlet", tab_r5.headerTemplate || tab_r5._headerTemplate);
  }
}
function TabView_For_8_Conditional_0_Conditional_2_Conditional_0_0_ng_template_0_Template(rf, ctx) {
}
function TabView_For_8_Conditional_0_Conditional_2_Conditional_0_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, TabView_For_8_Conditional_0_Conditional_2_Conditional_0_0_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function TabView_For_8_Conditional_0_Conditional_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, TabView_For_8_Conditional_0_Conditional_2_Conditional_0_0_Template, 1, 0, null, 14);
  }
  if (rf & 2) {
    const tab_r5 = ɵɵnextContext(3).$implicit;
    ɵɵproperty("ngTemplateOutlet", tab_r5.leftIconTemplate || tab_r5._leftIconTemplate);
  }
}
function TabView_For_8_Conditional_0_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 17);
  }
  if (rf & 2) {
    const tab_r5 = ɵɵnextContext(3).$implicit;
    ɵɵproperty("ngClass", tab_r5.leftIcon);
  }
}
function TabView_For_8_Conditional_0_Conditional_2_Conditional_3_0_ng_template_0_Template(rf, ctx) {
}
function TabView_For_8_Conditional_0_Conditional_2_Conditional_3_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, TabView_For_8_Conditional_0_Conditional_2_Conditional_3_0_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function TabView_For_8_Conditional_0_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, TabView_For_8_Conditional_0_Conditional_2_Conditional_3_0_Template, 1, 0, null, 14);
  }
  if (rf & 2) {
    const tab_r5 = ɵɵnextContext(3).$implicit;
    ɵɵproperty("ngTemplateOutlet", tab_r5.rightIconTemplate || tab_r5._rightIconTemplate);
  }
}
function TabView_For_8_Conditional_0_Conditional_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 18);
  }
  if (rf & 2) {
    const tab_r5 = ɵɵnextContext(3).$implicit;
    ɵɵproperty("ngClass", tab_r5.rightIcon);
  }
}
function TabView_For_8_Conditional_0_Conditional_2_Conditional_5_Conditional_0_0_ng_template_0_Template(rf, ctx) {
}
function TabView_For_8_Conditional_0_Conditional_2_Conditional_5_Conditional_0_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, TabView_For_8_Conditional_0_Conditional_2_Conditional_5_Conditional_0_0_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function TabView_For_8_Conditional_0_Conditional_2_Conditional_5_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, TabView_For_8_Conditional_0_Conditional_2_Conditional_5_Conditional_0_0_Template, 1, 0, null, 14);
  }
  if (rf & 2) {
    const tab_r5 = ɵɵnextContext(4).$implicit;
    ɵɵproperty("ngTemplateOutlet", tab_r5.closeIconTemplate || tab_r5._closeIconTemplate);
  }
}
function TabView_For_8_Conditional_0_Conditional_2_Conditional_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "TimesIcon", 19);
    ɵɵlistener("click", function TabView_For_8_Conditional_0_Conditional_2_Conditional_5_Conditional_1_Template_TimesIcon_click_0_listener($event) {
      ɵɵrestoreView(_r6);
      const tab_r5 = ɵɵnextContext(4).$implicit;
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.close($event, tab_r5));
    });
    ɵɵelementEnd();
  }
}
function TabView_For_8_Conditional_0_Conditional_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, TabView_For_8_Conditional_0_Conditional_2_Conditional_5_Conditional_0_Template, 1, 1)(1, TabView_For_8_Conditional_0_Conditional_2_Conditional_5_Conditional_1_Template, 1, 0, "TimesIcon");
  }
  if (rf & 2) {
    const tab_r5 = ɵɵnextContext(3).$implicit;
    ɵɵconditional(tab_r5.closeIconTemplate || tab_r5._closeIconTemplate ? 0 : 1);
  }
}
function TabView_For_8_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, TabView_For_8_Conditional_0_Conditional_2_Conditional_0_Template, 1, 1)(1, TabView_For_8_Conditional_0_Conditional_2_Conditional_1_Template, 1, 1, "span", 17);
    ɵɵtext(2);
    ɵɵtemplate(3, TabView_For_8_Conditional_0_Conditional_2_Conditional_3_Template, 1, 1)(4, TabView_For_8_Conditional_0_Conditional_2_Conditional_4_Template, 1, 1, "span", 18)(5, TabView_For_8_Conditional_0_Conditional_2_Conditional_5_Template, 2, 1);
  }
  if (rf & 2) {
    const tab_r5 = ɵɵnextContext(2).$implicit;
    ɵɵconditional(tab_r5.leftIconTemplate || tab_r5._leftIconTemplate ? 0 : tab_r5.leftIcon && !tab_r5.leftIconTemplate && !tab_r5._leftIconTemplate ? 1 : -1);
    ɵɵadvance(2);
    ɵɵtextInterpolate1(" ", tab_r5.header, " ");
    ɵɵadvance();
    ɵɵconditional(tab_r5.rightIconTemplate || tab_r5._rightIconTemplate ? 3 : tab_r5.rightIcon && !tab_r5.rightIconTemplate && !tab_r5._rightIconTemplate ? 4 : -1);
    ɵɵadvance(2);
    ɵɵconditional(tab_r5.closable ? 5 : -1);
  }
}
function TabView_For_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 15);
    ɵɵlistener("click", function TabView_For_8_Conditional_0_Template_button_click_0_listener($event) {
      ɵɵrestoreView(_r4);
      const tab_r5 = ɵɵnextContext().$implicit;
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.open($event, tab_r5));
    })("keydown", function TabView_For_8_Conditional_0_Template_button_keydown_0_listener($event) {
      ɵɵrestoreView(_r4);
      const tab_r5 = ɵɵnextContext().$implicit;
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onTabKeyDown($event, tab_r5));
    });
    ɵɵtemplate(1, TabView_For_8_Conditional_0_Conditional_1_Template, 1, 1, "ng-container")(2, TabView_For_8_Conditional_0_Conditional_2_Template, 6, 4);
    ɵɵelementEnd();
    ɵɵelement(3, "span", 16, 4);
  }
  if (rf & 2) {
    const ctx_r6 = ɵɵnextContext();
    const tab_r5 = ctx_r6.$implicit;
    const ɵ$index_19_r8 = ctx_r6.$index;
    const ctx_r2 = ɵɵnextContext();
    ɵɵclassMap(tab_r5.headerStyleClass);
    ɵɵproperty("ngClass", ɵɵpureFunction2(22, _c14, tab_r5.selected, tab_r5.disabled))("ngStyle", tab_r5.headerStyle)("pTooltip", tab_r5.tooltip)("tooltipPosition", tab_r5.tooltipPosition)("positionStyle", tab_r5.tooltipPositionStyle)("tooltipStyleClass", tab_r5.tooltipStyleClass)("disabled", tab_r5.disabled);
    ɵɵattribute("role", "tab")("id", ctx_r2.getTabHeaderActionId(tab_r5.id))("aria-controls", ctx_r2.getTabContentId(tab_r5.id))("aria-selected", tab_r5.selected)("tabindex", tab_r5.disabled || !tab_r5.selected ? "-1" : ctx_r2.tabindex)("aria-disabled", tab_r5.disabled)("data-pc-index", ɵ$index_19_r8)("data-p-disabled", tab_r5.disabled)("data-pc-section", "headeraction")("data-p-active", tab_r5.selected);
    ɵɵadvance();
    ɵɵconditional(tab_r5.headerTemplate || tab_r5._headerTemplate ? 1 : 2);
    ɵɵadvance(2);
    ɵɵattribute("aria-hidden", true)("data-pc-section", "inkbar");
  }
}
function TabView_For_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, TabView_For_8_Conditional_0_Template, 5, 25);
  }
  if (rf & 2) {
    const tab_r5 = ctx.$implicit;
    ɵɵconditional(!tab_r5.closed ? 0 : -1);
  }
}
function TabView_button_9_Conditional_2_0_ng_template_0_Template(rf, ctx) {
}
function TabView_button_9_Conditional_2_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, TabView_button_9_Conditional_2_0_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function TabView_button_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, TabView_button_9_Conditional_2_0_Template, 1, 0, null, 14);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r2.nextIconTemplate || ctx_r2._nextIconTemplate);
  }
}
function TabView_button_9_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "ChevronRightIcon");
  }
  if (rf & 2) {
    ɵɵattribute("aria-hidden", true);
  }
}
function TabView_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 20, 5);
    ɵɵlistener("click", function TabView_button_9_Template_button_click_0_listener() {
      ɵɵrestoreView(_r9);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.navForward());
    });
    ɵɵtemplate(2, TabView_button_9_Conditional_2_Template, 1, 1)(3, TabView_button_9_Conditional_3_Template, 1, 1, "ChevronRightIcon");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵattribute("tabindex", ctx_r2.tabindex)("aria-label", ctx_r2.nextButtonAriaLabel);
    ɵɵadvance(2);
    ɵɵconditional(ctx_r2.nextIconTemplate || ctx_r2._nextIconTemplate ? 2 : 3);
  }
}
var TabPanel = class _TabPanel extends BaseComponent {
  /**
   * Defines if tab can be removed.
   * @group Props
   */
  closable = false;
  /**
   * Inline style of the tab header.
   * @group Props
   */
  get headerStyle() {
    return this._headerStyle;
  }
  set headerStyle(headerStyle) {
    this._headerStyle = headerStyle;
    this.tabView.cd.markForCheck();
  }
  /**
   * Style class of the tab header.
   * @group Props
   */
  get headerStyleClass() {
    return this._headerStyleClass;
  }
  set headerStyleClass(headerStyleClass) {
    this._headerStyleClass = headerStyleClass;
    this.tabView.cd.markForCheck();
  }
  /**
   * Whether a lazy loaded panel should avoid getting loaded again on reselection.
   * @group Props
   */
  cache = true;
  /**
   * Advisory information to display in a tooltip on hover.
   * @group Props
   */
  tooltip;
  /**
   * Position of the tooltip.
   * @group Props
   */
  tooltipPosition = "top";
  /**
   * Type of CSS position.
   * @group Props
   */
  tooltipPositionStyle = "absolute";
  /**
   * Style class of the tooltip.
   * @group Props
   */
  tooltipStyleClass;
  /**
   * Defines if tab is active.
   * @defaultValue false
   * @group Props
   */
  get selected() {
    return !!this._selected;
  }
  set selected(val) {
    this._selected = val;
    if (!this.loaded) {
      this.cd.detectChanges();
    }
    if (val) this.loaded = true;
  }
  /**
   * When true, tab cannot be activated.
   * @defaultValue false
   * @group Props
   */
  get disabled() {
    return !!this._disabled;
  }
  set disabled(disabled) {
    this._disabled = disabled;
    this.tabView.cd.markForCheck();
  }
  /**
   * Title of the tabPanel.
   * @group Props
   */
  get header() {
    return this._header;
  }
  set header(header) {
    this._header = header;
    Promise.resolve().then(() => {
      this.tabView.updateInkBar();
      this.tabView.cd.markForCheck();
    });
  }
  /**
   * Left icon of the tabPanel.
   * @group Props
   * @deprecated since v15.4.2, use `lefticon` template instead.
   */
  get leftIcon() {
    return this._leftIcon;
  }
  set leftIcon(leftIcon) {
    this._leftIcon = leftIcon;
    this.tabView.cd.markForCheck();
  }
  /**
   * Left icon of the tabPanel.
   * @group Props
   * @deprecated since v15.4.2, use `righticon` template instead.
   */
  get rightIcon() {
    return this._rightIcon;
  }
  set rightIcon(rightIcon) {
    this._rightIcon = rightIcon;
    this.tabView.cd.markForCheck();
  }
  closed = false;
  _headerStyle;
  _headerStyleClass;
  _selected;
  _disabled;
  _header;
  _leftIcon;
  _rightIcon = void 0;
  loaded = false;
  id = uuid("pn_id_");
  contentTemplate;
  headerTemplate;
  leftIconTemplate;
  rightIconTemplate;
  closeIconTemplate;
  templates;
  tabView = inject(forwardRef(() => TabView));
  _componentStyle = inject(TabsStyle);
  _headerTemplate;
  _contentTemplate;
  _rightIconTemplate;
  _leftIconTemplate;
  _closeIconTemplate;
  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "header":
          this._headerTemplate = item.template;
          break;
        case "content":
          this._contentTemplate = item.template;
          break;
        case "righticon":
          this._rightIconTemplate = item.template;
          break;
        case "lefticon":
          this._leftIconTemplate = item.template;
          break;
        case "closeicon":
          this._closeIconTemplate = item.template;
          break;
        default:
          this._contentTemplate = item.template;
          break;
      }
    });
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTabPanel_BaseFactory;
    return function TabPanel_Factory(__ngFactoryType__) {
      return (ɵTabPanel_BaseFactory || (ɵTabPanel_BaseFactory = ɵɵgetInheritedFactory(_TabPanel)))(__ngFactoryType__ || _TabPanel);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _TabPanel,
    selectors: [["p-tabPanel"], ["p-tabpanel"]],
    contentQueries: function TabPanel_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c0, 5);
        ɵɵcontentQuery(dirIndex, _c1, 5);
        ɵɵcontentQuery(dirIndex, _c2, 5);
        ɵɵcontentQuery(dirIndex, _c3, 5);
        ɵɵcontentQuery(dirIndex, _c4, 5);
        ɵɵcontentQuery(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.contentTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.leftIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.rightIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.closeIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    inputs: {
      closable: [2, "closable", "closable", booleanAttribute],
      headerStyle: "headerStyle",
      headerStyleClass: "headerStyleClass",
      cache: [2, "cache", "cache", booleanAttribute],
      tooltip: "tooltip",
      tooltipPosition: "tooltipPosition",
      tooltipPositionStyle: "tooltipPositionStyle",
      tooltipStyleClass: "tooltipStyleClass",
      selected: "selected",
      disabled: "disabled",
      header: "header",
      leftIcon: "leftIcon",
      rightIcon: "rightIcon"
    },
    standalone: true,
    features: [ɵɵProvidersFeature([TabsStyle]), ɵɵInputTransformsFeature, ɵɵInheritDefinitionFeature, ɵɵStandaloneFeature],
    ngContentSelectors: _c5,
    decls: 1,
    vars: 1,
    consts: [["class", "p-tabview-panel", "role", "tabpanel", 3, "hidden", 4, "ngIf"], ["role", "tabpanel", 1, "p-tabview-panel", 3, "hidden"], [4, "ngIf"], [4, "ngTemplateOutlet"]],
    template: function TabPanel_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵtemplate(0, TabPanel_div_0_Template, 3, 6, "div", 0);
      }
      if (rf & 2) {
        ɵɵproperty("ngIf", !ctx.closed);
      }
    },
    dependencies: [CommonModule, NgIf, NgTemplateOutlet, SharedModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabPanel, [{
    type: Component,
    args: [{
      selector: "p-tabPanel, p-tabpanel",
      standalone: true,
      imports: [CommonModule, SharedModule],
      template: `
        <div
            *ngIf="!closed"
            class="p-tabview-panel"
            role="tabpanel"
            [hidden]="!selected"
            [attr.id]="tabView.getTabContentId(id)"
            [attr.aria-hidden]="!selected"
            [attr.aria-labelledby]="tabView.getTabHeaderActionId(id)"
            [attr.data-pc-name]="'tabpanel'"
        >
            <ng-content></ng-content>
            <ng-container *ngIf="(contentTemplate || _contentTemplate) && (cache ? loaded : selected)">
                <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate"></ng-container>
            </ng-container>
        </div>
    `,
      providers: [TabsStyle]
    }]
  }], null, {
    closable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    headerStyle: [{
      type: Input
    }],
    headerStyleClass: [{
      type: Input
    }],
    cache: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    tooltip: [{
      type: Input
    }],
    tooltipPosition: [{
      type: Input
    }],
    tooltipPositionStyle: [{
      type: Input
    }],
    tooltipStyleClass: [{
      type: Input
    }],
    selected: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    header: [{
      type: Input
    }],
    leftIcon: [{
      type: Input
    }],
    rightIcon: [{
      type: Input
    }],
    contentTemplate: [{
      type: ContentChild,
      args: ["content"]
    }],
    headerTemplate: [{
      type: ContentChild,
      args: ["header"]
    }],
    leftIconTemplate: [{
      type: ContentChild,
      args: ["lefticon"]
    }],
    rightIconTemplate: [{
      type: ContentChild,
      args: ["righticon"]
    }],
    closeIconTemplate: [{
      type: ContentChild,
      args: ["closeicon"]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassDebugInfo(TabPanel, {
    className: "TabPanel"
  });
})();
var TabView = class _TabView extends BaseComponent {
  get hostClass() {
    return this.styleClass;
  }
  get hostStyle() {
    return this.style;
  }
  /**
   * Inline style of the component.
   * @group Props
   */
  style;
  /**
   * Style class of the component.
   * @group Props
   */
  styleClass;
  /**
   * Whether tab close is controlled at onClose event or not.
   * @defaultValue false
   * @group Props
   */
  controlClose;
  /**
   * When enabled displays buttons at each side of the tab headers to scroll the tab list.
   * @defaultValue false
   * @group Props
   */
  scrollable;
  /**
   * Index of the active tab to change selected tab programmatically.
   * @group Props
   */
  get activeIndex() {
    return this._activeIndex;
  }
  set activeIndex(val) {
    this._activeIndex = val;
    if (this.preventActiveIndexPropagation) {
      this.preventActiveIndexPropagation = false;
      return;
    }
    if (this.tabs && this.tabs.length && this._activeIndex != null && this.tabs.length > this._activeIndex) {
      this.findSelectedTab().selected = false;
      this.tabs[this._activeIndex].selected = true;
      this.tabChanged = true;
      this.updateScrollBar(val);
    }
  }
  /**
   * When enabled, the focused tab is activated.
   * @group Props
   */
  selectOnFocus = false;
  /**
   * Used to define a string aria label attribute the forward navigation button.
   * @group Props
   */
  nextButtonAriaLabel;
  /**
   * Used to define a string aria label attribute the backward navigation button.
   * @group Props
   */
  prevButtonAriaLabel;
  /**
   * When activated, navigation buttons will automatically hide or show based on the available space within the container.
   * @group Props
   */
  autoHideButtons = true;
  /**
   * Index of the element in tabbing order.
   * @group Props
   */
  tabindex = 0;
  /**
   * Callback to invoke on tab change.
   * @param {TabViewChangeEvent} event - Custom tab change event
   * @group Emits
   */
  onChange = new EventEmitter();
  /**
   * Callback to invoke on tab close.
   * @param {TabViewCloseEvent} event - Custom tab close event
   * @group Emits
   */
  onClose = new EventEmitter();
  /**
   * Callback to invoke on the active tab change.
   * @param {number} index - New active index
   * @group Emits
   */
  activeIndexChange = new EventEmitter();
  content;
  navbar;
  prevBtn;
  nextBtn;
  inkbar;
  tabPanels;
  initialized;
  tabs;
  _activeIndex;
  preventActiveIndexPropagation;
  tabChanged;
  backwardIsDisabled = true;
  forwardIsDisabled = false;
  tabChangesSubscription;
  resizeObserver;
  container;
  list;
  buttonVisible;
  elementToObserve;
  previousIconTemplate;
  nextIconTemplate;
  _previousIconTemplate;
  _nextIconTemplate;
  _componentStyle = inject(TabsStyle);
  templates;
  ngOnInit() {
    super.ngOnInit();
    console.log("TabView component is deprecated as of v18. Use Tabs component instead.");
  }
  ngAfterContentInit() {
    this.initTabs();
    this.tabChangesSubscription = this.tabPanels.changes.subscribe((_) => {
      this.initTabs();
      this.refreshButtonState();
    });
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "previousicon":
          this._previousIconTemplate = item.template;
          break;
        case "nexticon":
          this._nextIconTemplate = item.template;
          break;
      }
    });
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
    if (isPlatformBrowser(this.platformId)) {
      if (this.autoHideButtons) {
        this.bindResizeObserver();
      }
    }
  }
  bindResizeObserver() {
    this.container = findSingle(this.el.nativeElement, '[data-pc-section="navcontent"]');
    this.list = findSingle(this.el.nativeElement, '[data-pc-section="nav"]');
    this.resizeObserver = new ResizeObserver(() => {
      if (this.list.offsetWidth >= this.container.offsetWidth) {
        this.buttonVisible = true;
      } else {
        this.buttonVisible = false;
      }
      this.updateButtonState();
      this.cd.detectChanges();
    });
    this.resizeObserver.observe(this.container);
  }
  unbindResizeObserver() {
    this.resizeObserver.unobserve(this.elementToObserve.nativeElement);
    this.resizeObserver = null;
  }
  ngAfterViewChecked() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.tabChanged) {
        this.updateInkBar();
        this.tabChanged = false;
      }
    }
  }
  ngOnDestroy() {
    if (this.tabChangesSubscription) {
      this.tabChangesSubscription.unsubscribe();
    }
    if (this.resizeObserver) {
      this.unbindResizeObserver();
    }
    super.ngOnDestroy();
  }
  getTabHeaderActionId(tabId) {
    return `${tabId}_header_action`;
  }
  getTabContentId(tabId) {
    return `${tabId}_content`;
  }
  initTabs() {
    this.tabs = this.tabPanels.toArray();
    let selectedTab = this.findSelectedTab();
    if (!selectedTab && this.tabs.length) {
      if (this.activeIndex != null && this.tabs.length > this.activeIndex) this.tabs[this.activeIndex].selected = true;
      else this.tabs[0].selected = true;
      this.tabChanged = true;
    }
    this.cd.markForCheck();
  }
  onTabKeyDown(event, tab) {
    switch (event.code) {
      case "ArrowLeft":
        this.onTabArrowLeftKey(event);
        break;
      case "ArrowRight":
        this.onTabArrowRightKey(event);
        break;
      case "Home":
        this.onTabHomeKey(event);
        break;
      case "End":
        this.onTabEndKey(event);
        break;
      case "PageDown":
        this.onTabEndKey(event);
        break;
      case "PageUp":
        this.onTabHomeKey(event);
        break;
      case "Enter":
      case "Space":
        this.open(event, tab);
        break;
      default:
        break;
    }
  }
  onTabArrowLeftKey(event) {
    const prevHeaderAction = this.findPrevHeaderAction(event.currentTarget);
    const index = getAttribute(prevHeaderAction, "data-pc-index");
    prevHeaderAction ? this.changeFocusedTab(event, prevHeaderAction, index) : this.onTabEndKey(event);
    event.preventDefault();
  }
  onTabArrowRightKey(event) {
    const nextHeaderAction = this.findNextHeaderAction(event.currentTarget);
    const index = getAttribute(nextHeaderAction, "data-pc-index");
    nextHeaderAction ? this.changeFocusedTab(event, nextHeaderAction, index) : this.onTabHomeKey(event);
    event.preventDefault();
  }
  onTabHomeKey(event) {
    const firstHeaderAction = this.findFirstHeaderAction();
    const index = getAttribute(firstHeaderAction, "data-pc-index");
    this.changeFocusedTab(event, firstHeaderAction, index);
    event.preventDefault();
  }
  onTabEndKey(event) {
    const lastHeaderAction = this.findLastHeaderAction();
    const index = getAttribute(lastHeaderAction, "data-pc-index");
    this.changeFocusedTab(event, lastHeaderAction, index);
    event.preventDefault();
  }
  changeFocusedTab(event, element, index) {
    if (element) {
      focus(element);
      element.scrollIntoView({
        block: "nearest"
      });
      if (this.selectOnFocus) {
        const tab = this.tabs[index];
        this.open(event, tab);
      }
    }
  }
  findNextHeaderAction(tabElement, selfCheck = false) {
    const headerElement = selfCheck ? tabElement : tabElement.nextElementSibling;
    return headerElement ? getAttribute(headerElement, "data-p-disabled") || getAttribute(headerElement, "data-pc-section") === "inkbar" ? this.findNextHeaderAction(headerElement) : headerElement : null;
  }
  findPrevHeaderAction(tabElement, selfCheck = false) {
    const headerElement = selfCheck ? tabElement : tabElement.previousElementSibling;
    return headerElement ? getAttribute(headerElement, "data-p-disabled") || getAttribute(headerElement, "data-pc-section") === "inkbar" ? this.findPrevHeaderAction(headerElement) : headerElement : null;
  }
  findFirstHeaderAction() {
    const firstEl = this.navbar.nativeElement.firstElementChild;
    return this.findNextHeaderAction(firstEl, true);
  }
  findLastHeaderAction() {
    const lastEl = this.navbar.nativeElement.lastElementChild;
    const lastHeaderAction = getAttribute(lastEl, "data-pc-section") === "inkbar" ? lastEl.previousElementSibling : lastEl;
    return this.findPrevHeaderAction(lastHeaderAction, true);
  }
  open(event, tab) {
    if (tab.disabled) {
      if (event) {
        event.preventDefault();
      }
      return;
    }
    if (!tab.selected) {
      let selectedTab = this.findSelectedTab();
      if (selectedTab) {
        selectedTab.selected = false;
      }
      this.tabChanged = true;
      tab.selected = true;
      let selectedTabIndex = this.findTabIndex(tab);
      this.preventActiveIndexPropagation = true;
      this.activeIndexChange.emit(selectedTabIndex);
      this.onChange.emit({
        originalEvent: event,
        index: selectedTabIndex
      });
      this.updateScrollBar(selectedTabIndex);
    }
    if (event) {
      event.preventDefault();
    }
  }
  close(event, tab) {
    if (this.controlClose) {
      this.onClose.emit({
        originalEvent: event,
        index: this.findTabIndex(tab),
        close: () => {
          this.closeTab(tab);
        }
      });
    } else {
      this.closeTab(tab);
      this.onClose.emit({
        originalEvent: event,
        index: this.findTabIndex(tab)
      });
    }
    event.stopPropagation();
  }
  closeTab(tab) {
    if (tab.disabled) {
      return;
    }
    if (tab.selected) {
      this.tabChanged = true;
      tab.selected = false;
      for (let i = 0; i < this.tabs.length; i++) {
        let tabPanel = this.tabs[i];
        if (!tabPanel.closed && !tab.disabled) {
          tabPanel.selected = true;
          break;
        }
      }
    }
    tab.closed = true;
  }
  findSelectedTab() {
    for (let i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i].selected) {
        return this.tabs[i];
      }
    }
    return null;
  }
  findTabIndex(tab) {
    let index = -1;
    for (let i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i] == tab) {
        index = i;
        break;
      }
    }
    return index;
  }
  getBlockableElement() {
    return this.el.nativeElement.children[0];
  }
  updateInkBar() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.navbar) {
        const tabHeader = findSingle(this.navbar.nativeElement, '[data-pc-section="headeraction"][data-p-active="true"]');
        if (!tabHeader) {
          return;
        }
        this.inkbar.nativeElement.style.width = getOuterWidth(tabHeader) + "px";
        this.inkbar.nativeElement.style.left = getOffset(tabHeader).left - getOffset(this.navbar.nativeElement).left + "px";
      }
    }
  }
  updateScrollBar(index) {
    let tabHeader = find(this.navbar.nativeElement, '[data-pc-section="headeraction"]')[index];
    if (tabHeader) {
      tabHeader.scrollIntoView({
        block: "nearest"
      });
    }
  }
  updateButtonState() {
    const content = this.content.nativeElement;
    const {
      scrollLeft,
      scrollWidth
    } = content;
    const width = getWidth(content);
    this.backwardIsDisabled = scrollLeft === 0;
    this.forwardIsDisabled = Math.round(scrollLeft) === scrollWidth - width;
  }
  refreshButtonState() {
    this.container = findSingle(this.el.nativeElement, '[data-pc-section="navcontent"]');
    this.list = findSingle(this.el.nativeElement, '[data-pc-section="nav"]');
    if (this.list.offsetWidth >= this.container.offsetWidth) {
      if (this.list.offsetWidth >= this.container.offsetWidth) {
        this.buttonVisible = true;
      } else {
        this.buttonVisible = false;
      }
      this.updateButtonState();
      this.cd.markForCheck();
    }
  }
  onScroll(event) {
    this.scrollable && this.updateButtonState();
    event.preventDefault();
  }
  getVisibleButtonWidths() {
    return [this.prevBtn?.nativeElement, this.nextBtn?.nativeElement].reduce((acc, el) => el ? acc + getWidth(el) : acc, 0);
  }
  navBackward() {
    const content = this.content.nativeElement;
    const width = getWidth(content) - this.getVisibleButtonWidths();
    const pos = content.scrollLeft - width;
    content.scrollLeft = pos <= 0 ? 0 : pos;
  }
  navForward() {
    const content = this.content.nativeElement;
    const width = getWidth(content) - this.getVisibleButtonWidths();
    const pos = content.scrollLeft + width;
    const lastPos = content.scrollWidth - width;
    content.scrollLeft = pos >= lastPos ? lastPos : pos;
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTabView_BaseFactory;
    return function TabView_Factory(__ngFactoryType__) {
      return (ɵTabView_BaseFactory || (ɵTabView_BaseFactory = ɵɵgetInheritedFactory(_TabView)))(__ngFactoryType__ || _TabView);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _TabView,
    selectors: [["p-tabView"], ["p-tabview"]],
    contentQueries: function TabView_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c6, 5);
        ɵɵcontentQuery(dirIndex, _c7, 5);
        ɵɵcontentQuery(dirIndex, TabPanel, 4);
        ɵɵcontentQuery(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.previousIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.nextIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.tabPanels = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    viewQuery: function TabView_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c0, 5);
        ɵɵviewQuery(_c8, 5);
        ɵɵviewQuery(_c9, 5);
        ɵɵviewQuery(_c10, 5);
        ɵɵviewQuery(_c11, 5);
        ɵɵviewQuery(_c12, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.content = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.navbar = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.prevBtn = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.nextBtn = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.inkbar = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.elementToObserve = _t.first);
      }
    },
    hostVars: 11,
    hostBindings: function TabView_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("data-pc-name", "tabview");
        ɵɵstyleMap(ctx.hostStyle);
        ɵɵclassMap(ctx.hostClass);
        ɵɵclassProp("p-tabs", true)("p-tabs-scrollable", ctx.scrollable)("p-component", true);
      }
    },
    inputs: {
      style: "style",
      styleClass: "styleClass",
      controlClose: [2, "controlClose", "controlClose", booleanAttribute],
      scrollable: [2, "scrollable", "scrollable", booleanAttribute],
      activeIndex: "activeIndex",
      selectOnFocus: [2, "selectOnFocus", "selectOnFocus", booleanAttribute],
      nextButtonAriaLabel: "nextButtonAriaLabel",
      prevButtonAriaLabel: "prevButtonAriaLabel",
      autoHideButtons: [2, "autoHideButtons", "autoHideButtons", booleanAttribute],
      tabindex: [2, "tabindex", "tabindex", numberAttribute]
    },
    outputs: {
      onChange: "onChange",
      onClose: "onClose",
      activeIndexChange: "activeIndexChange"
    },
    standalone: true,
    features: [ɵɵProvidersFeature([TabsStyle]), ɵɵInputTransformsFeature, ɵɵInheritDefinitionFeature, ɵɵStandaloneFeature],
    ngContentSelectors: _c5,
    decls: 12,
    vars: 7,
    consts: [["elementToObserve", ""], ["content", ""], ["navbar", ""], ["prevBtn", ""], ["inkbar", ""], ["nextBtn", ""], [1, "p-tablist"], ["class", "p-tablist-prev-button p-tablist-nav-button", "type", "button", "pRipple", "", 3, "click", 4, "ngIf"], [1, "p-tablist-content", 3, "scroll", "ngClass"], ["role", "tablist", 1, "p-tablist-tab-list"], ["class", "p-tablist-next-button p-tablist-nav-button", "type", "button", "pRipple", "", 3, "click", 4, "ngIf"], [1, "p-tabpanels"], ["type", "button", "pRipple", "", 1, "p-tablist-prev-button", "p-tablist-nav-button", 3, "click"], [4, "ngIf"], [4, "ngTemplateOutlet"], ["pRipple", "", 3, "click", "keydown", "ngClass", "ngStyle", "pTooltip", "tooltipPosition", "positionStyle", "tooltipStyleClass", "disabled"], ["role", "presentation", 1, "p-tablist-active-bar"], [1, "p-tabview-left-icon", 3, "ngClass"], [1, "p-tabview-right-icon", 3, "ngClass"], [3, "click"], ["type", "button", "pRipple", "", 1, "p-tablist-next-button", "p-tablist-nav-button", 3, "click"]],
    template: function TabView_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = ɵɵgetCurrentView();
        ɵɵprojectionDef();
        ɵɵelementStart(0, "div", 6, 0);
        ɵɵtemplate(2, TabView_button_2_Template, 4, 4, "button", 7);
        ɵɵelementStart(3, "div", 8, 1);
        ɵɵlistener("scroll", function TabView_Template_div_scroll_3_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onScroll($event));
        });
        ɵɵelementStart(5, "div", 9, 2);
        ɵɵrepeaterCreate(7, TabView_For_8_Template, 1, 1, null, null, ɵɵrepeaterTrackByIdentity);
        ɵɵelementEnd()();
        ɵɵtemplate(9, TabView_button_9_Template, 4, 3, "button", 10);
        ɵɵelementEnd();
        ɵɵelementStart(10, "div", 11);
        ɵɵprojection(11);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.scrollable && !ctx.backwardIsDisabled && ctx.autoHideButtons);
        ɵɵadvance();
        ɵɵproperty("ngClass", ɵɵpureFunction1(5, _c13, ctx.scrollable));
        ɵɵattribute("data-pc-section", "navcontent");
        ɵɵadvance(2);
        ɵɵattribute("data-pc-section", "nav");
        ɵɵadvance(2);
        ɵɵrepeater(ctx.tabs);
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.scrollable && !ctx.forwardIsDisabled && ctx.buttonVisible);
      }
    },
    dependencies: [CommonModule, NgClass, NgIf, NgTemplateOutlet, NgStyle, SharedModule, TooltipModule, Tooltip, Ripple, TimesIcon, ChevronLeftIcon, ChevronRightIcon],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabView, [{
    type: Component,
    args: [{
      selector: "p-tabView, p-tabview",
      standalone: true,
      imports: [CommonModule, SharedModule, TooltipModule, Ripple, TimesIcon, ChevronLeftIcon, ChevronRightIcon],
      template: `
        <div #elementToObserve class="p-tablist">
            <button
                *ngIf="scrollable && !backwardIsDisabled && autoHideButtons"
                #prevBtn
                class="p-tablist-prev-button p-tablist-nav-button"
                (click)="navBackward()"
                [attr.tabindex]="tabindex"
                [attr.aria-label]="prevButtonAriaLabel"
                type="button"
                pRipple
            >
                <ChevronLeftIcon *ngIf="!previousIconTemplate && !_previousIconTemplate" [attr.aria-hidden]="true" />
                <ng-template *ngTemplateOutlet="previousIconTemplate && _previousIconTemplate"></ng-template>
            </button>
            <div #content class="p-tablist-content" [ngClass]="{ 'p-tablist-viewport': scrollable }" (scroll)="onScroll($event)" [attr.data-pc-section]="'navcontent'">
                <div #navbar class="p-tablist-tab-list" role="tablist" [attr.data-pc-section]="'nav'">
                    @for (tab of tabs; track tab; let i = $index) {
                        @if (!tab.closed) {
                            <button
                                [ngClass]="{
                                    'p-tab': true,
                                    'p-tab-active': tab.selected,
                                    'p-disabled': tab.disabled
                                }"
                                [attr.role]="'tab'"
                                [class]="tab.headerStyleClass"
                                [ngStyle]="tab.headerStyle"
                                [pTooltip]="tab.tooltip"
                                [tooltipPosition]="tab.tooltipPosition"
                                [positionStyle]="tab.tooltipPositionStyle"
                                [tooltipStyleClass]="tab.tooltipStyleClass"
                                [attr.id]="getTabHeaderActionId(tab.id)"
                                [attr.aria-controls]="getTabContentId(tab.id)"
                                [attr.aria-selected]="tab.selected"
                                [attr.tabindex]="tab.disabled || !tab.selected ? '-1' : tabindex"
                                [attr.aria-disabled]="tab.disabled"
                                [disabled]="tab.disabled"
                                [attr.data-pc-index]="i"
                                [attr.data-p-disabled]="tab.disabled"
                                [attr.data-pc-section]="'headeraction'"
                                [attr.data-p-active]="tab.selected"
                                (click)="open($event, tab)"
                                (keydown)="onTabKeyDown($event, tab)"
                                pRipple
                            >
                                @if (tab.headerTemplate || tab._headerTemplate) {
                                    <ng-container *ngTemplateOutlet="tab.headerTemplate || tab._headerTemplate"></ng-container>
                                } @else {
                                    @if (tab.leftIconTemplate || tab._leftIconTemplate) {
                                        <ng-template *ngTemplateOutlet="tab.leftIconTemplate || tab._leftIconTemplate"></ng-template>
                                    } @else if (tab.leftIcon && !tab.leftIconTemplate && !tab._leftIconTemplate) {
                                        <span class="p-tabview-left-icon" [ngClass]="tab.leftIcon"></span>
                                    }
                                    {{ tab.header }}
                                    @if (tab.rightIconTemplate || tab._rightIconTemplate) {
                                        <ng-template *ngTemplateOutlet="tab.rightIconTemplate || tab._rightIconTemplate"></ng-template>
                                    } @else if (tab.rightIcon && !tab.rightIconTemplate && !tab._rightIconTemplate) {
                                        <span class="p-tabview-right-icon" [ngClass]="tab.rightIcon"></span>
                                    }
                                    @if (tab.closable) {
                                        @if (tab.closeIconTemplate || tab._closeIconTemplate) {
                                            <ng-template *ngTemplateOutlet="tab.closeIconTemplate || tab._closeIconTemplate"></ng-template>
                                        } @else {
                                            <TimesIcon (click)="close($event, tab)" />
                                        }
                                    }
                                }
                            </button>
                            <span #inkbar class="p-tablist-active-bar" role="presentation" [attr.aria-hidden]="true" [attr.data-pc-section]="'inkbar'"></span>
                        }
                    }
                </div>
            </div>
            <button *ngIf="scrollable && !forwardIsDisabled && buttonVisible" #nextBtn [attr.tabindex]="tabindex" [attr.aria-label]="nextButtonAriaLabel" class="p-tablist-next-button p-tablist-nav-button" (click)="navForward()" type="button" pRipple>
                @if (nextIconTemplate || _nextIconTemplate) {
                    <ng-template *ngTemplateOutlet="nextIconTemplate || _nextIconTemplate"></ng-template>
                } @else {
                    <ChevronRightIcon [attr.aria-hidden]="true" />
                }
            </button>
        </div>
        <div class="p-tabpanels">
            <ng-content></ng-content>
        </div>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      host: {
        "[class.p-tabs]": "true",
        "[class.p-tabs-scrollable]": "scrollable",
        "[class.p-component]": "true",
        "[attr.data-pc-name]": '"tabview"'
      },
      providers: [TabsStyle]
    }]
  }], null, {
    hostClass: [{
      type: HostBinding,
      args: ["class"]
    }],
    hostStyle: [{
      type: HostBinding,
      args: ["style"]
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    controlClose: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    scrollable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    activeIndex: [{
      type: Input
    }],
    selectOnFocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nextButtonAriaLabel: [{
      type: Input
    }],
    prevButtonAriaLabel: [{
      type: Input
    }],
    autoHideButtons: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    tabindex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    onChange: [{
      type: Output
    }],
    onClose: [{
      type: Output
    }],
    activeIndexChange: [{
      type: Output
    }],
    content: [{
      type: ViewChild,
      args: ["content"]
    }],
    navbar: [{
      type: ViewChild,
      args: ["navbar"]
    }],
    prevBtn: [{
      type: ViewChild,
      args: ["prevBtn"]
    }],
    nextBtn: [{
      type: ViewChild,
      args: ["nextBtn"]
    }],
    inkbar: [{
      type: ViewChild,
      args: ["inkbar"]
    }],
    tabPanels: [{
      type: ContentChildren,
      args: [TabPanel]
    }],
    elementToObserve: [{
      type: ViewChild,
      args: ["elementToObserve"]
    }],
    previousIconTemplate: [{
      type: ContentChild,
      args: ["previousicon"]
    }],
    nextIconTemplate: [{
      type: ContentChild,
      args: ["nexticon"]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassDebugInfo(TabView, {
    className: "TabView"
  });
})();
var TabViewModule = class _TabViewModule {
  static ɵfac = function TabViewModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TabViewModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _TabViewModule
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [TabView, TabPanel, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabViewModule, [{
    type: NgModule,
    args: [{
      imports: [TabView, TabPanel, SharedModule],
      exports: [TabView, TabPanel, SharedModule]
    }]
  }], null, null);
})();
(function() {
  (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(TabViewModule, {
    imports: [TabView, TabPanel, SharedModule],
    exports: [TabView, TabPanel, SharedModule]
  });
})();
export {
  TabPanel,
  TabView,
  TabViewModule,
  TabsClasses,
  TabsStyle
};
//# sourceMappingURL=primeng_tabview.js.map
