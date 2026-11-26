import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Drawer } from "vaul";
import { Plus } from "lucide-react";
import { useIsMobile } from "../../hooks/use-mobile";
import "./AvatarActionMenu.css";

/**
 * AvatarActionMenu — a round "+" badge that sits on a profile avatar and opens
 * the photo actions (view / change / add story …).
 *
 *  - Desktop: a dropdown menu anchored to the badge.
 *  - Phone (< mobileBreakpoint): a bottom sheet with the same items + Cancel.
 *
 * The visual badge is `size` px but the button's hit area is always 44×44.
 * `ringColor` should match the surface behind the avatar so the badge reads
 * as cut out of it. Pass `open`/`onOpenChange` to control it — e.g. to open the
 * menu from a click on the avatar itself.
 *
 * Styled with its own CSS (bond-aam*) like every lib component — consumers
 * don't run Tailwind over lib sources. Every element that can receive events
 * (the root and the portalled menu / sheet) carries `data-bond-avatar-menu`,
 * so a consumer's own click handlers can ignore events bubbling out of it.
 *
 *   <AvatarActionMenu
 *     items={[
 *       { key: "view", label: "View photo", icon: Eye, onSelect: openViewer },
 *       { key: "change", label: "Change profile picture", icon: Camera, onSelect: pickFile },
 *     ]}
 *   />
 */
function useControllableOpen(open, onOpenChange) {
  const [innerOpen, setInnerOpen] = React.useState(false);
  const isControlled = open !== undefined;
  const value = isControlled ? !!open : innerOpen;
  const setValue = React.useCallback(
    (next) => {
      if (!isControlled) setInnerOpen(next);
      if (onOpenChange) onOpenChange(next);
    },
    [isControlled, onOpenChange],
  );
  return [value, setValue];
}

function renderIcon(Icon) {
  if (!Icon) return null;
  if (React.isValidElement(Icon)) return Icon;
  return <Icon aria-hidden="true" focusable="false" />;
}

const Badge = React.forwardRef(function Badge(
  { size, ringColor, icon: Icon, label, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      className="bond-aam__trigger"
      {...rest}
    >
      <span
        aria-hidden="true"
        className="bond-aam__badge"
        style={{ "--bond-aam-size": `${size}px`, "--bond-aam-ring": ringColor }}
      >
        <Icon aria-hidden="true" focusable="false" />
      </span>
    </button>
  );
});

function SheetMenu({ items, title, onSelectItem }) {
  const itemRefs = React.useRef([]);
  const enabled = items
    .map((item, index) => (item.disabled ? -1 : index))
    .filter((index) => index !== -1);
  const [active, setActive] = React.useState(enabled[0] ?? 0);

  const focusAt = (index) => {
    setActive(index);
    const el = itemRefs.current[index];
    if (el) el.focus();
  };

  const onKeyDown = (event) => {
    if (!enabled.length) return;
    const pos = enabled.indexOf(active);
    let next = null;
    if (event.key === "ArrowDown") next = enabled[(pos + 1) % enabled.length];
    else if (event.key === "ArrowUp") next = enabled[(pos - 1 + enabled.length) % enabled.length];
    else if (event.key === "Home") next = enabled[0];
    else if (event.key === "End") next = enabled[enabled.length - 1];
    if (next === null) return;
    event.preventDefault();
    focusAt(next);
  };

  return (
    <div role="menu" aria-label={title} className="bond-aam__sheet-menu" onKeyDown={onKeyDown}>
      {items.map((item, index) => (
        <button
          key={item.key}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          type="button"
          role="menuitem"
          className="bond-aam__item"
          tabIndex={index === active ? 0 : -1}
          disabled={item.disabled || undefined}
          aria-disabled={item.disabled || undefined}
          data-disabled={item.disabled ? "" : undefined}
          data-first-item={index === enabled[0] ? "" : undefined}
          onFocus={() => setActive(index)}
          onClick={() => onSelectItem(item)}
        >
          {renderIcon(item.icon)}
          <span className="bond-aam__label">{item.label}</span>
        </button>
      ))}
    </div>
  );
}

export function AvatarActionMenu({
  items = [],
  open,
  onOpenChange,
  triggerLabel = "Profile photo options",
  title = "Profile photo",
  cancelLabel = "Cancel",
  size = 36,
  ringColor = "#1a0e2e",
  mobileBreakpoint = 768,
  icon: Icon = Plus,
  className = "",
  modal = false,
}) {
  const [isOpen, setOpen] = useControllableOpen(open, onOpenChange);
  const isMobile = useIsMobile(mobileBreakpoint);
  const triggerRef = React.useRef(null);
  const sheetRef = React.useRef(null);
  const visibleItems = items.filter((item) => item && !item.hidden);
  const rootClass = `bond-aam ${className}`.trim();
  const badgeProps = { size, ringColor, icon: Icon, label: triggerLabel };

  if (isMobile) {
    const selectItem = (item) => {
      if (item.disabled) return;
      if (item.onSelect) item.onSelect();
      setOpen(false);
    };
    return (
      <span className={rootClass} data-bond-avatar-menu="">
        <Badge
          ref={triggerRef}
          {...badgeProps}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          data-state={isOpen ? "open" : "closed"}
          onClick={() => setOpen(!isOpen)}
        />
        <Drawer.Root open={isOpen} onOpenChange={setOpen} shouldScaleBackground={false}>
          <Drawer.Portal>
            <Drawer.Overlay className="bond-aam__overlay" data-bond-avatar-menu="" />
            <Drawer.Content
              ref={sheetRef}
              className="bond-aam__sheet"
              data-bond-avatar-menu=""
              aria-describedby={undefined}
              onOpenAutoFocus={(event) => {
                event.preventDefault();
                const first = sheetRef.current?.querySelector("[data-first-item]");
                if (first) first.focus();
              }}
              onCloseAutoFocus={(event) => {
                event.preventDefault();
                if (triggerRef.current) triggerRef.current.focus();
              }}
            >
              <div aria-hidden="true" className="bond-aam__handle" />
              <Drawer.Title className="bond-aam__sheet-title">{title}</Drawer.Title>
              <SheetMenu items={visibleItems} title={title} onSelectItem={selectItem} />
              <Drawer.Close className="bond-aam__cancel">{cancelLabel}</Drawer.Close>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </span>
    );
  }

  return (
    <span className={rootClass} data-bond-avatar-menu="">
      <DropdownMenu.Root open={isOpen} onOpenChange={setOpen} modal={modal}>
        <DropdownMenu.Trigger asChild>
          <Badge ref={triggerRef} {...badgeProps} />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            side="bottom"
            align="end"
            sideOffset={8}
            className="bond-aam__content"
            aria-label={title}
            aria-labelledby={undefined}
            data-bond-avatar-menu=""
          >
            {visibleItems.map((item) => (
              <DropdownMenu.Item
                key={item.key}
                className="bond-aam__item"
                disabled={item.disabled}
                onSelect={() => {
                  if (item.onSelect) item.onSelect();
                }}
              >
                {renderIcon(item.icon)}
                <span className="bond-aam__label">{item.label}</span>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </span>
  );
}

export default AvatarActionMenu;
