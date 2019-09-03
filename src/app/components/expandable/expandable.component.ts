import { Component, AfterViewInit, Input, ViewChild,  ElementRef, Renderer2 } from "@angular/core";

@Component({
  selector: "app-expandable",
  templateUrl: "./expandable.component.html",
  styleUrls: ["./expandable.component.scss"]
})
export class ExpandableComponent implements AfterViewInit {
  @ViewChild("expandWrapper", { read: ElementRef }) expandWrapper: ElementRef;
  @Input("expandHeight") expandHeight: string = "150px";
  expanded = false;

  constructor(public renderer: Renderer2) {}

  ngAfterViewInit() {
    this.renderer.setStyle(this.expandWrapper.nativeElement, "max-height", this.expandHeight);
  }

  toggle() {
    this.expanded = !this.expanded;
  }
}