# -*- coding: utf-8 -*-
"""Generate twilight-bundle.json for fashion abaya components."""
import json
import uuid
from copy import deepcopy
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BUNDLE_PATH = ROOT / "twilight-bundle.json"


def u():
    return str(uuid.uuid4())


LINK_SOURCES = [
    {"label": "منتج", "key": "products", "value": "products"},
    {"label": "تصنيف", "key": "categories", "value": "categories"},
    {"label": "ماركة تجارية", "key": "brands", "value": "brands"},
    {"label": "صفحة تعريفية", "key": "pages", "value": "pages"},
    {"label": "مقالة", "key": "blog_articles", "value": "blog_articles"},
    {"label": "تصنيف ضمن المدونة", "key": "blog_categories", "value": "blog_categories"},
    {"label": "التخفيضات", "key": "offers_link", "value": "offers_link"},
    {"label": "الماركات التجارية", "key": "brands_link", "value": "brands_link"},
    {"label": "المدونة", "key": "blog_link", "value": "blog_link"},
    {"label": "رابط خارجي", "key": "custom", "value": "custom"},
]

IMG = {
    "abaya1": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    "abaya2": "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
    "abaya3": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    "abaya4": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    "fabric": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    "boutique": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80",
    "mystery": "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000&q=80",
    "base": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=80",
    "swipe": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
    "duel": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    "care": "https://images.unsplash.com/photo-1582735686739-59b3e394b3a5?auto=format&fit=crop&w=800&q=80",
    "compare": "https://images.unsplash.com/photo-1551488831-00afeb5a9965?auto=format&fit=crop&w=800&q=80",
    "look": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
    "config": "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=80",
}


def cond_eq(field_id, value):
    """Show field when sibling/parent field equals value (Saji/Raed editor)."""
    return [{"id": field_id, "value": value, "operation": "="}]


def cond_neq(field_id, value):
    """Show field when sibling/parent field is not equal to value."""
    return [{"id": field_id, "value": value, "operation": "!="}]


def cond_all(*groups):
    """AND multiple condition groups."""
    out = []
    for group in groups:
        if not group:
            continue
        out.extend(group)
    return out


def with_conditions(field, conditions=None):
    if conditions:
        field["conditions"] = conditions
    return field


def static_title(fid, title, conditions=None):
    return with_conditions(
        {
            "type": "static",
            "format": "title",
            "id": fid,
            "value": (
                "<div class='rounded-lg' style='background-color: #8b5e4b; display: flex; "
                "justify-content: center; align-items: center;padding: 15px;margin-bottom: 20px !important; "
                "flex-direction: column;gap: 15px;'><h6 style='color: #ffffff;font-size: 15px; font-weight: bold;'>"
                f"{title}</h6> </div>"
            ),
            "key": u(),
        },
        conditions,
    )


def multilang(fid, label, ar, en, fmt="text", max_len="120", desc=None, conditions=None):
    return with_conditions(
        {
            "id": fid,
            "key": u(),
            "type": "string",
            "format": fmt,
            "label": label,
            "description": desc,
            "labelHTML": None,
            "placeholder": label,
            "icon": "sicon-format-text-alt",
            "value": {"ar": ar, "en": en},
            "multilanguage": True,
            "required": False,
            "minLength": 0,
            "maxLength": max_len,
        },
        conditions,
    )


def text(
    fid,
    label,
    value="",
    fmt="text",
    max_len="200",
    required=False,
    desc=None,
    icon="sicon-format-text-alt",
    conditions=None,
):
    return with_conditions(
        {
            "id": fid,
            "key": u(),
            "type": "string",
            "format": fmt,
            "label": label,
            "description": desc,
            "labelHTML": None,
            "placeholder": label,
            "icon": icon,
            "value": value,
            "required": required,
            "minLength": 0,
            "maxLength": max_len,
        },
        conditions,
    )


def image(fid, label, value, desc=None, required=False, conditions=None):
    return with_conditions(
        {
            "id": fid,
            "key": u(),
            "type": "string",
            "format": "image",
            "label": label,
            "description": desc,
            "labelHTML": None,
            "placeholder": "e.g. https://hostname.com/image.png",
            "icon": "sicon-image",
            "value": value,
            "required": required,
        },
        conditions,
    )


def color(fid, label, value, desc=None, conditions=None):
    return with_conditions(
        {
            "id": fid,
            "key": u(),
            "type": "string",
            "format": "color",
            "inputType": "color",
            "label": label,
            "description": desc,
            "labelHTML": None,
            "icon": "sicon-format-fill",
            "value": value,
            "required": False,
        },
        conditions,
    )


def number(fid, label, value, minimum=0, maximum=500, unit="px", desc=None, conditions=None):
    return with_conditions(
        {
            "id": fid,
            "class": "rounded-lg text-primary border hover:bg-gray-50 p-2",
            "key": u(),
            "type": "number",
            "format": "units",
            "label": label,
            "description": desc,
            "labelHTML": None,
            "placeholder": str(value),
            "icon": "sicon-percentage",
            "value": value,
            "required": False,
            "unit": unit,
            "minimum": minimum,
            "maximum": str(maximum),
        },
        conditions,
    )


def boolean(fid, label, value=True, desc=None, conditions=None):
    return with_conditions(
        {
            "id": fid,
            "key": u(),
            "type": "boolean",
            "format": "switch",
            "label": label,
            "description": desc,
            "labelHTML": None,
            "icon": "sicon-toggle-off",
            "value": value,
            "selected": bool(value),
            "required": False,
        },
        conditions,
    )


def variable_list(fid, label="الرابط", conditions=None):
    return with_conditions(
        {
            "type": "items",
            "icon": "sicon-link",
            "label": label,
            "id": fid,
            "value": None,
            "description": None,
            "required": False,
            "format": "variable-list",
            "searchable": True,
            "source": "offers_link",
            "sources": deepcopy(LINK_SOURCES),
            "key": u(),
        },
        conditions,
    )


def products_picker(
    fid,
    label="اختر المنتج",
    *,
    multichoice=True,
    required=False,
    max_length=1,
    min_length=0,
    desc=None,
    conditions=None,
):
    """Saji-style Products picker (matches theme Saji's «المنتجات المختارة»)."""
    return with_conditions(
        {
            "id": fid,
            "icon": "sicon-keyboard_arrow_down",
            "type": "items",
            "label": label,
            "format": "dropdown-list",
            "source": "products",
            "options": [],
            "required": required,
            "selected": [],
            "maxLength": max_length,
            "minLength": min_length,
            "searchable": True,
            "description": desc,
            "multichoice": multichoice,
            "key": u(),
        },
        conditions,
    )


def dropdown_manual(
    fid,
    label,
    options,
    selected_value,
    *,
    icon="sicon-t-shirt",
    multichoice=False,
    desc=None,
    conditions=None,
):
    """Saji-style Manual dropdown (products source type, etc.).

    Mirrors theme Saji's «نوع المنتجات» field exactly: no `value`/`searchable`
    keys — the selection lives in `selected`, which is what Salla's editor uses
    to evaluate `conditions` on dependent fields.
    """
    opts = [{"key": val, "label": lbl, "value": val} for lbl, val in options]
    selected = next((o for o in opts if o["value"] == selected_value), opts[0])
    return with_conditions(
        {
            "id": fid,
            "icon": icon,
            "type": "items",
            "label": label,
            "format": "dropdown-list",
            "source": "Manual",
            "options": opts,
            "required": False,
            "selected": [selected],
            "description": desc,
            "multichoice": multichoice,
            "key": u(),
        },
        conditions,
    )


def categories_picker(fid, label="التصنيف", *, conditions=None, desc=None):
    """Saji-style categories picker (matches theme Saji's «التصنيف»)."""
    return with_conditions(
        {
            "id": fid,
            "icon": "sicon-keyboard_arrow_down",
            "type": "items",
            "label": label,
            "format": "dropdown-list",
            "source": "categories",
            "options": [],
            "required": False,
            "selected": [],
            "searchable": True,
            "description": desc,
            "key": u(),
        },
        conditions,
    )


def radio(fid, label, options, selected_value=None, conditions=None):
    opts = [{"label": lbl, "value": val, "key": u()} for lbl, val in options]
    selected_src = next((o for o in opts if o["value"] == selected_value), opts[0])
    selected = {
        "label": selected_src["label"],
        "value": selected_src["value"],
        "key": selected_src["key"],
    }
    return with_conditions(
        {
            "id": fid,
            "key": u(),
            "type": "items",
            "format": "radio-list",
            "label": label,
            "description": None,
            "labelHTML": None,
            "icon": "sicon-list",
            "selected": [selected],
            "options": opts,
            "source": "Manual",
            "required": False,
            "class": "rounded-lg text-primary border hover:bg-gray-50 p-4",
        },
        conditions,
    )


def collection(fid, label, fields, value, min_len=0, max_len=40, required=False, conditions=None):
    return with_conditions(
        {
            "id": fid,
            "type": "collection",
            "format": "collection",
            "required": required,
            "minLength": min_len,
            "maxLength": max_len,
            "item_label": label,
            "value": value,
            "fields": fields,
            "key": u(),
            "label": label,
        },
        conditions,
    )


def product_source_fields(
    source_id,
    *,
    chosen_id="chosen_products",
    category_id="category",
    limit_id="products_limit",
    limit_default=6,
    include_none=False,
    default_source="selected",
    extra_when_active=None,
):
    """
    Raed/Saji product source + conditional dependent fields for the theme editor.
    - chosen_products → only when source = selected
    - category → only when source = categories
    - limit (+ extras) → when source is active (not none)
    """
    options = []
    if include_none:
        options.append(("بدون — لا منتجات", "none"))
    options.extend(
        [
            ("منتجات من تصنيف", "categories"),
            ("الأكثر مبيعا", "sales"),
            ("أحدث المنتجات", "latest"),
            ("منتجات مختارة", "selected"),
        ]
    )
    if include_none and default_source not in {v for _, v in options}:
        default_source = "none"

    active = cond_neq(source_id, "none") if include_none else None
    fields = [
        dropdown_manual(
            source_id,
            "نوع المنتجات",
            options,
            default_source,
            icon="sicon-t-shirt",
        ),
        products_picker(
            chosen_id,
            "المنتجات المختارة",
            multichoice=True,
            max_length=24,
            conditions=cond_eq(source_id, "selected"),
        ),
        categories_picker(
            category_id,
            "التصنيف",
            conditions=cond_eq(source_id, "categories"),
        ),
        number(
            limit_id,
            "عدد المنتجات",
            limit_default,
            1,
            40,
            "",
            "الحد الأقصى للمنتجات المعروضة",
            conditions=active,
        ),
    ]
    if extra_when_active:
        for field in extra_when_active:
            # Merge active condition with any existing conditions on the field
            existing = field.get("conditions") or []
            field["conditions"] = cond_all(active, existing) if active else existing
            fields.append(field)
    return fields


def theme_fields(p):
    return [
        static_title(f"{p}theme_title", "ألوان وتنسيق العنصر"),
        color(f"{p}bg", "لون الخلفية", "#faf7f5"),
        color(f"{p}text", "لون النص", "#2b211c"),
        color(f"{p}muted", "لون النص الثانوي", "#7a6a62"),
        color(f"{p}accent", "اللون الرئيسي", "#8b5e4b"),
        color(f"{p}card", "لون البطاقات", "#ffffff"),
        color(f"{p}border", "لون الحدود", "#e8ddd6"),
        color(f"{p}button_bg", "خلفية الأزرار", "#8b5e4b"),
        color(f"{p}button_color", "لون نص الأزرار", "#ffffff"),
        number(f"{p}radius", "تدوير الحواف", 16, 0, 40, "px"),
        static_title(f"{p}space_title", "المسافة الخارجية أعلى وأسفل"),
        number(f"{p}space_desktop", "الكمبيوتر", 48, 0, 250, "px"),
        number(f"{p}space_mobile", "الجوال", 28, 0, 120, "px"),
    ]


def component(name, title, icon, image, fields):
    return {
        "key": u(),
        "name": name,
        "title": title,
        "icon": icon,
        "image": image,
        "preview_image": image,
        "fields": fields,
    }


def build_alc():
    p = "alc_"
    return component(
        "abaya-length-calculator",
        "حاسبة طول العباية",
        "sicon-calculator",
        IMG["abaya1"],
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "حاسبة طول العباية", "Abaya Length Calculator"),
            multilang(
                f"{p}desc",
                "الوصف",
                "أدخلي طولك وتفضيلك لنقترح طول العباية الأنسب لك.",
                "Enter your height and preferences to get a suggested abaya length.",
                "textarea",
                "300",
            ),
            multilang(
                f"{p}disclaimer",
                "نص التنبيه",
                "النتيجة استرشادية وقد تختلف حسب القصة والقماش.",
                "This result is a guide and may vary by cut and fabric.",
                "textarea",
                "300",
            ),
            number(f"{p}min_height", "الحد الأدنى لطول العميلة", 150, 120, 220, "cm"),
            number(f"{p}max_height", "الحد الأعلى لطول العميلة", 180, 120, 230, "cm"),
            number(
                f"{p}default_height",
                "الطول الافتراضي",
                165,
                120,
                230,
                "cm",
                "يُملأ تلقائياً عند فتح الحاسبة ويُقترح المقاس المناسب",
            ),
            number(f"{p}shorter_offset", "مقدار التخفيض (أقصر)", 2, 0, 20, "cm"),
            number(f"{p}longer_offset", "مقدار الزيادة (أطول)", 2, 0, 20, "cm"),
            multilang(f"{p}calc_btn", "نص زر الحساب", "احسبي الطول", "Calculate"),
            multilang(f"{p}reset_btn", "نص زر إعادة الحساب", "إعادة الحساب", "Recalculate"),
            multilang(f"{p}shop_btn", "نص زر التسوق", "تسوّقي هذا المقاس", "Shop this size"),
            collection(
                f"{p}ranges",
                "نطاق",
                [
                    number("min_height", "الحد الأدنى للطول", 150, 100, 230, "cm"),
                    number("max_height", "الحد الأعلى للطول", 160, 100, 230, "cm"),
                    number("flat_length", "طول العباية للحذاء المسطح", 150, 100, 230, "cm"),
                    number("mid_heel_length", "طول العباية للكعب المتوسط", 152, 100, 230, "cm"),
                    number("high_heel_length", "طول العباية للكعب المرتفع", 154, 100, 230, "cm"),
                    multilang("alt_size", "المقاس البديل", "مقاس 52", "Size 52", max_len="40"),
                    multilang("note", "ملاحظة", "مناسب للقصة المستقيمة", "Suitable for a straight cut", "textarea", "200"),
                    variable_list("products_url", "رابط منتجات هذا المقاس"),
                ],
                [
                    {
                        "min_height": 150,
                        "max_height": 158,
                        "flat_length": 150,
                        "mid_heel_length": 152,
                        "high_heel_length": 154,
                        "alt_size": {"ar": "مقاس 50", "en": "Size 50"},
                        "note": {"ar": "طول مريح مع حذاء مسطح", "en": "Comfortable with flat shoes"},
                    },
                    {
                        "min_height": 159,
                        "max_height": 168,
                        "flat_length": 158,
                        "mid_heel_length": 160,
                        "high_heel_length": 162,
                        "alt_size": {"ar": "مقاس 52", "en": "Size 52"},
                        "note": {"ar": "مناسب لمعظم القصص", "en": "Fits most silhouettes"},
                    },
                    {
                        "min_height": 169,
                        "max_height": 180,
                        "flat_length": 168,
                        "mid_heel_length": 170,
                        "high_heel_length": 172,
                        "alt_size": {"ar": "مقاس 54", "en": "Size 54"},
                        "note": {"ar": "يفضّل تجربة المقاس إن أمكن", "en": "Try in store when possible"},
                    },
                ],
                1,
                30,
                True,
            ),
            *theme_fields(p),
        ],
    )


def build_aca():
    p = "aca_"
    return component(
        "abaya-care-assistant",
        "مساعد العناية بالعباية",
        "sicon-book-open",
        IMG["care"],
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "مساعد العناية بالعباية", "Abaya Care Assistant"),
            multilang(
                f"{p}desc",
                "الوصف",
                "دليل عناية مفصّل لكل نوع قماش — من الغسيل إلى التخزين.",
                "Detailed care guide for each fabric type — from washing to storage.",
                "textarea",
                "300",
            ),
            multilang(f"{p}search_placeholder", "نص البحث", "ابحثي عن القماش...", "Search fabrics..."),
            multilang(f"{p}copy_btn", "نص زر النسخ", "نسخ التعليمات", "Copy instructions"),
            multilang(f"{p}print_btn", "نص زر الطباعة", "طباعة البطاقة", "Print card"),
            multilang(f"{p}copied_msg", "رسالة النسخ", "تم النسخ بنجاح", "Copied successfully"),
            collection(
                f"{p}fabrics",
                "قماش",
                [
                    multilang("fabric_name", "اسم القماش", "شيفون", "Chiffon"),
                    image("fabric_image", "صورة القماش", IMG["fabric"]),
                    multilang("fabric_summary", "ملخص", "خفيف وناعم", "Light and soft", "textarea", "200"),
                    multilang("pre_wash", "قبل الغسيل", "انقلبي العباية واغلقي الأزرار", "Turn inside out and close buttons", "textarea", "300"),
                    multilang("wash", "الغسيل", "غسيل يدوي بماء بارد", "Hand wash in cold water", "textarea", "300"),
                    multilang("dry", "التجفيف", "تجفيف مسطح بعيداً عن الشمس", "Flat dry away from sun", "textarea", "300"),
                    multilang("iron", "الكي", "كي من الجهة الداخلية على حرارة منخفضة", "Iron inside on low heat", "textarea", "300"),
                    multilang("store", "التخزين", "علقي على شماعة عريضة", "Hang on a wide hanger", "textarea", "300"),
                    multilang("stain", "إزالة البقع", "معالجة فورية بماء بارد", "Treat immediately with cold water", "textarea", "300"),
                    multilang("embroidery_warn", "تنبيه التطريز", "تجنّبي الكي المباشر على التطريز", "Avoid direct ironing on embroidery", "textarea", "300"),
                    multilang("wash_temp", "حرارة الغسيل", "30°م كحد أقصى", "30°C max"),
                    static_title("allows_title", "ما المسموح؟"),
                    boolean("allow_washer", "مسموح بالغسالة", False),
                    boolean("allow_dryer", "مسموح بالمجفف", False),
                    boolean("allow_steam", "مسموح بالبخار", True),
                ],
                [
                    {
                        "fabric_name": {"ar": "شيفون", "en": "Chiffon"},
                        "fabric_image": IMG["fabric"],
                        "fabric_summary": {"ar": "خفيف وناعم — مثالي للمناسبات", "en": "Light and soft — ideal for occasions"},
                        "pre_wash": {"ar": "انقلبي العباية واغلقي الأزرار", "en": "Turn inside out and close buttons"},
                        "wash": {"ar": "غسيل يدوي بماء بارد", "en": "Hand wash in cold water"},
                        "dry": {"ar": "تجفيف مسطح بعيداً عن الشمس", "en": "Flat dry away from sun"},
                        "iron": {"ar": "كي من الجهة الداخلية على حرارة منخفضة", "en": "Iron inside on low heat"},
                        "store": {"ar": "علقي على شماعة عريضة", "en": "Hang on a wide hanger"},
                        "stain": {"ar": "معالجة فورية بماء بارد", "en": "Treat immediately with cold water"},
                        "embroidery_warn": {"ar": "تجنّبي الكي المباشر على التطريز", "en": "Avoid direct ironing on embroidery"},
                        "wash_temp": {"ar": "30°م", "en": "30°C"},
                        "allow_washer": False,
                        "allow_dryer": False,
                        "allow_steam": True,
                    },
                    {
                        "fabric_name": {"ar": "كريب", "en": "Crepe"},
                        "fabric_image": IMG["abaya2"],
                        "fabric_summary": {"ar": "متين وعملي للاستخدام اليومي", "en": "Durable and practical for daily wear"},
                        "pre_wash": {"ar": "افصلي الألوان الداكنة", "en": "Separate dark colors"},
                        "wash": {"ar": "غسيل لطيف على برنامج delicate", "en": "Gentle wash on delicate cycle"},
                        "dry": {"ar": "تعليق في الظل", "en": "Hang dry in shade"},
                        "iron": {"ar": "بخار خفيف أو كي منخفض", "en": "Light steam or low iron"},
                        "store": {"ar": "طيّي بعناية لتجنب التجاعيد", "en": "Fold carefully to avoid creases"},
                        "allow_washer": True,
                        "allow_dryer": False,
                        "allow_steam": True,
                    },
                ],
                1,
                20,
                True,
            ),
            *theme_fields(p),
        ],
    )


def build_afl():
    p = "afl_"
    return component(
        "abaya-fabric-lab",
        "مختبر أقمشة العبايات",
        "sicon-eye",
        IMG["fabric"],
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "مختبر أقمشة العبايات", "Abaya Fabric Lab"),
            multilang(
                f"{p}desc",
                "الوصف",
                "استكشفي خصائص الأقمشة ومقارنتها بصرياً.",
                "Explore fabric properties and compare them visually.",
                "textarea",
                "300",
            ),
            multilang(f"{p}compare_btn", "نص زر المقارنة", "قارني", "Compare"),
            multilang(f"{p}exit_compare", "نص إنهاء المقارنة", "إنهاء المقارنة", "Exit compare"),
            boolean(f"{p}autoplay_video", "تشغيل الفيديو تلقائياً", False),
            collection(
                f"{p}fabrics",
                "قماش",
                [
                    multilang("fabric_name", "اسم القماش", "شيفون فاخر", "Premium chiffon"),
                    multilang("fabric_desc", "الوصف", "ناعم وخفيف مع تدفق رائع", "Soft and light with beautiful drape", "textarea", "300"),
                    image("macro_image", "صورة مقرّبة", IMG["fabric"]),
                    text("video_url", "رابط الفيديو", "", "url", "500", icon="sicon-video"),
                    number("flow", "التدفق", 85, 0, 100, "%"),
                    number("thickness", "السماكة", 20, 0, 100, "%"),
                    number("shine", "اللمعة", 30, 0, 100, "%"),
                    number("summer", "ملاءمة الصيف", 90, 0, 100, "%"),
                    number("wrinkle", "مقاومة التجاعيد", 40, 0, 100, "%"),
                    number("transparency", "الشفافية", 35, 0, 100, "%"),
                    multilang("wash_care", "تعليمات الغسيل", "غسيل يدوي بارد", "Cold hand wash", "textarea", "200"),
                    multilang("iron_care", "تعليمات الكي", "كي منخفض مع بخار", "Low iron with steam", "textarea", "200"),
                    multilang("best_use", "أفضل استخدام", "مناسبات وصيف", "Occasions and summer", "textarea", "200"),
                ],
                [
                    {
                        "fabric_name": {"ar": "شيفون فاخر", "en": "Premium chiffon"},
                        "fabric_desc": {"ar": "ناعم وخفيف مع تدفق رائع", "en": "Soft and light with beautiful drape"},
                        "macro_image": IMG["fabric"],
                        "flow": 85,
                        "thickness": 20,
                        "shine": 30,
                        "summer": 90,
                        "wrinkle": 40,
                        "transparency": 35,
                        "wash_care": {"ar": "غسيل يدوي بارد", "en": "Cold hand wash"},
                        "iron_care": {"ar": "كي منخفض مع بخار", "en": "Low iron with steam"},
                        "best_use": {"ar": "مناسبات وصيف", "en": "Occasions and summer"},
                    },
                    {
                        "fabric_name": {"ar": "كريب مطوّى", "en": "Pleated crepe"},
                        "fabric_desc": {"ar": "متين مع قوام أنيق", "en": "Durable with elegant texture"},
                        "macro_image": IMG["abaya3"],
                        "flow": 55,
                        "thickness": 55,
                        "shine": 15,
                        "summer": 60,
                        "wrinkle": 70,
                        "transparency": 10,
                        "wash_care": {"ar": "غسيل لطيف", "en": "Gentle wash"},
                        "iron_care": {"ar": "بخار متوسط", "en": "Medium steam"},
                        "best_use": {"ar": "دوام وخروج", "en": "Work and outings"},
                    },
                ],
                1,
                15,
                True,
            ),
            *theme_fields(p),
        ],
    )


def build_asd():
    p = "asd_"
    return component(
        "abaya-style-duel",
        "تحدي العبايات",
        "sicon-trophy",
        IMG["duel"],
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "تحدي العبايات", "Abaya Style Duel"),
            multilang(
                f"{p}desc",
                "الوصف",
                "صوّتي لأسلوبك المفضل واكتشفي ذوقك في العبايات.",
                "Vote for your favorite style and discover your abaya taste.",
                "textarea",
                "300",
            ),
            multilang(f"{p}result_note", "ملاحظة النتائج", "النتائج محلية على جهازك", "Results are local to your device", "textarea", "200"),
            multilang(f"{p}next_btn", "نص الجولة التالية", "الجولة التالية", "Next round"),
            boolean(f"{p}use_seed_votes", "استخدام أصوات تجريبية", True),
            boolean(f"{p}allow_revote", "السماح بإعادة التصويت", False),
            boolean(f"{p}hide_result_source", "إخفاء ملاحظة المصدر", False),
            text(f"{p}storage_key", "مفتاح التخزين المحلي", "asd-style-duel-votes", desc="مفتاح فريد لحفظ الأصوات"),
            collection(
                f"{p}rounds",
                "جولة",
                [
                    multilang("question", "السؤال", "أي قصة تفضّلين؟", "Which cut do you prefer?", "textarea", "200"),
                    image("img_a", "صورة الخيار أ", IMG["abaya1"]),
                    multilang("name_a", "اسم الخيار أ", "قصة مستقيمة", "Straight cut"),
                    variable_list("url_a", "رابط الخيار أ"),
                    number("votes_a", "أصوات تجريبية (أ)", 120, 0, 9999, ""),
                    image("img_b", "صورة الخيار ب", IMG["abaya2"]),
                    multilang("name_b", "اسم الخيار ب", "قصة A-line", "A-line cut"),
                    variable_list("url_b", "رابط الخيار ب"),
                    number("votes_b", "أصوات تجريبية (ب)", 95, 0, 9999, ""),
                    multilang("result_desc", "وصف النتيجة", "ذوقك يميل للقصص المستقيمة الأنيقة", "You lean toward elegant straight cuts", "textarea", "300"),
                    boolean("enable_next", "إظهار زر الجولة التالية", True),
                ],
                [
                    {
                        "question": {"ar": "أي قصة تفضّلين؟", "en": "Which cut do you prefer?"},
                        "img_a": IMG["abaya1"],
                        "name_a": {"ar": "قصة مستقيمة", "en": "Straight cut"},
                        "votes_a": 120,
                        "img_b": IMG["abaya2"],
                        "name_b": {"ar": "قصة A-line", "en": "A-line cut"},
                        "votes_b": 95,
                        "result_desc": {"ar": "ذوقك يميل للقصص المستقيمة الأنيقة", "en": "You lean toward elegant straight cuts"},
                        "enable_next": True,
                    },
                    {
                        "question": {"ar": "أي تفاصيل تفضّلين؟", "en": "Which details do you prefer?"},
                        "img_a": IMG["abaya3"],
                        "name_a": {"ar": "تطريز خفيف", "en": "Light embroidery"},
                        "votes_a": 80,
                        "img_b": IMG["abaya4"],
                        "name_b": {"ar": "تطريز غني", "en": "Rich embroidery"},
                        "votes_b": 110,
                        "result_desc": {"ar": "تحبّين التفاصيل اللامعة", "en": "You love standout details"},
                        "enable_next": False,
                    },
                ],
                1,
                20,
                True,
            ),
            *theme_fields(p),
        ],
    )


def build_ass():
    p = "ass_"
    return component(
        "abaya-style-swipe",
        "اكتشفي ذوقك",
        "sicon-heart",
        IMG["swipe"],
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "اكتشفي ذوقك", "Discover Your Style"),
            multilang(
                f"{p}desc",
                "الوصف",
                "اسحبي يميناً للإعجاب ويساراً للتخطي — واكتشفي أسلوبك.",
                "Swipe right to like, left to skip — discover your style.",
                "textarea",
                "300",
            ),
            multilang(f"{p}like_label", "نص الإعجاب", "أعجبني", "Like"),
            multilang(f"{p}skip_label", "نص التخطي", "تخطي", "Skip"),
            multilang(f"{p}undo_label", "نص التراجع", "تراجع", "Undo"),
            multilang(f"{p}restart_label", "نص إعادة البدء", "ابدئي من جديد", "Restart"),
            boolean(f"{p}enable_storage", "حفظ التقدم محلياً", True),
            text(f"{p}storage_key", "مفتاح التخزين المحلي", "ass-style-swipe-state"),
            collection(
                f"{p}cards",
                "بطاقة",
                [
                    image("image", "صورة الإطلالة", IMG["swipe"]),
                    multilang("look_name", "اسم الإطلالة", "كلاسيك أنيق", "Elegant classic"),
                    multilang("look_desc", "الوصف", "عباية سوداء بقصة مستقيمة", "Black abaya with straight cut", "textarea", "300"),
                    multilang("tags", "الوسوم (مفصولة بفاصلة)", "كلاسيك,أنيق", "classic,elegant"),
                    variable_list("url", "رابط الإطلالة"),
                    multilang("btn_text", "نص الزر", "تسوقي", "Shop"),
                ],
                [
                    {
                        "image": IMG["swipe"],
                        "look_name": {"ar": "كلاسيك أنيق", "en": "Elegant classic"},
                        "look_desc": {"ar": "عباية سوداء بقصة مستقيمة", "en": "Black abaya with straight cut"},
                        "tags": {"ar": "كلاسيك,أنيق", "en": "classic,elegant"},
                    },
                    {
                        "image": IMG["abaya2"],
                        "look_name": {"ar": "عصري مزخرف", "en": "Modern embellished"},
                        "look_desc": {"ar": "تطريز خفيف على الأكمام", "en": "Light embroidery on sleeves"},
                        "tags": {"ar": "عصري,مزخرف", "en": "modern,embellished"},
                    },
                    {
                        "image": IMG["abaya3"],
                        "look_name": {"ar": "صيفي خفيف", "en": "Light summer"},
                        "look_desc": {"ar": "قماش شيفون مناسب للحر", "en": "Chiffon fabric for warm days"},
                        "tags": {"ar": "صيفي,خفيف", "en": "summer,light"},
                    },
                ],
                1,
                30,
                True,
            ),
            collection(
                f"{p}results",
                "نتيجة",
                [
                    multilang("tag_name", "اسم الوسم", "كلاسيك", "classic"),
                    multilang("result_title", "عنوان النتيجة", "أسلوبك الكلاسيكي", "Your classic style"),
                    multilang("result_desc", "وصف النتيجة", "تفضّلين القصص المستقيمة والأناقة الهادئة", "You prefer straight cuts and quiet elegance", "textarea", "300"),
                    image("result_image", "صورة النتيجة", IMG["abaya1"]),
                    variable_list("result_url", "رابط النتيجة"),
                    multilang("result_btn", "نص زر النتيجة", "تسوقي الإطلالة", "Shop the look"),
                ],
                [
                    {
                        "tag_name": {"ar": "كلاسيك", "en": "classic"},
                        "result_title": {"ar": "أسلوبك الكلاسيكي", "en": "Your classic style"},
                        "result_desc": {"ar": "تفضّلين القصص المستقيمة والأناقة الهادئة", "en": "You prefer straight cuts and quiet elegance"},
                        "result_image": IMG["abaya1"],
                        "result_btn": {"ar": "تسوقي الإطلالة", "en": "Shop the look"},
                    },
                    {
                        "tag_name": {"ar": "عصري", "en": "modern"},
                        "result_title": {"ar": "أسلوبك العصري", "en": "Your modern style"},
                        "result_desc": {"ar": "تحبّين التفاصيل الجريئة واللمسات المعاصرة", "en": "You love bold details and contemporary touches"},
                        "result_image": IMG["abaya2"],
                        "result_btn": {"ar": "تسوقي الإطلالة", "en": "Shop the look"},
                    },
                ],
                0,
                20,
                False,
            ),
            *theme_fields(p),
        ],
    )


def build_cr():
    p = "cr_"
    return component(
        "collection-reveal",
        "إطلاق المجموعة الجديدة",
        "sicon-rocket",
        IMG["mystery"],
        [
            static_title(f"{p}pre_title", "مرحلة ما قبل الإطلاق"),
            multilang(f"{p}tease_title", "عنوان التشويق", "مجموعة رمضان قادمة", "Ramadan collection coming soon"),
            multilang(
                f"{p}tease_desc",
                "وصف التشويق",
                "اكتشفي أناقة جديدة قريباً",
                "Discover new elegance soon",
                "textarea",
                "300",
            ),
            multilang(f"{p}pre_text", "نص ما قبل الإطلاق", "العد التنازلي بدأ...", "The countdown has begun..."),
            image(f"{p}bg_image", "صورة الخلفية", IMG["mystery"]),
            image(f"{p}mystery_image", "صورة الغموض", IMG["abaya4"]),
            text(f"{p}launch_at", "تاريخ الإطلاق", "2026-12-31T20:00:00", desc="صيغة ISO مثل 2026-12-31T20:00:00"),
            boolean(f"{p}show_days", "إظهار الأيام", True),
            boolean(f"{p}show_hours", "إظهار الساعات", True),
            boolean(f"{p}show_minutes", "إظهار الدقائق", True),
            boolean(f"{p}show_seconds", "إظهار الثواني", True),
            boolean(f"{p}breath_effect", "تأثير التنفس على الصورة", True),
            number(f"{p}overlay_opacity", "شفافية الطبقة", 45, 0, 100, "%"),
            color(f"{p}overlay_color", "لون الطبقة", "#2b211c"),
            color(f"{p}timer_color", "لون العد التنازلي", "#8b5e4b"),
            static_title(f"{p}post_title", "مرحلة ما بعد الإطلاق"),
            multilang(f"{p}launch_title", "عنوان الإطلاق", "المجموعة متوفرة الآن", "Collection is live"),
            multilang(
                f"{p}launch_desc",
                "وصف الإطلاق",
                "تسوّقي أحدث تصاميم العبايات",
                "Shop our latest abaya designs",
                "textarea",
                "300",
            ),
            image(f"{p}launch_media", "وسائط الإطلاق", IMG["abaya1"]),
            variable_list(f"{p}cta_url", "رابط الدعوة للعمل"),
            multilang(f"{p}cta_text", "نص زر الدعوة", "اكتشفي المجموعة", "Explore collection"),
            collection(
                f"{p}products",
                "منتج",
                [
                    image("image", "صورة المنتج", IMG["abaya1"]),
                    multilang("name", "اسم المنتج", "عباية كلاسيك", "Classic abaya"),
                    multilang("desc", "الوصف", "قصة مستقيمة بقماش فاخر", "Straight cut in premium fabric", "textarea", "300"),
                    variable_list("url", "رابط المنتج"),
                    multilang("btn_text", "نص الزر", "تسوقي الآن", "Shop now"),
                ],
                [
                    {
                        "image": IMG["abaya1"],
                        "name": {"ar": "عباية كلاسيك", "en": "Classic abaya"},
                        "desc": {"ar": "قصة مستقيمة بقماش فاخر", "en": "Straight cut in premium fabric"},
                        "btn_text": {"ar": "تسوقي الآن", "en": "Shop now"},
                    },
                    {
                        "image": IMG["abaya2"],
                        "name": {"ar": "عباية مزخرفة", "en": "Embellished abaya"},
                        "desc": {"ar": "تطريز يدوي على الأكمام", "en": "Hand embroidery on sleeves"},
                        "btn_text": {"ar": "تسوقي الآن", "en": "Shop now"},
                    },
                ],
                0,
                12,
                False,
            ),
            *theme_fields(p),
        ],
    )


def build_vab():
    p = "vab_"

    def hotspot_product_fields():
        return product_source_fields(
            "products",
            default_source="latest",
            limit_default=6,
        )

    def demo_products(items):
        return [
            {
                "name": {"ar": name_ar, "en": name_en},
                "image": img,
                "price": price,
                "old_price": old,
                "url": {"type": "custom", "url": url},
            }
            for name_ar, name_en, img, price, old, url in items
        ]

    return component(
        "virtual-abaya-boutique",
        "بوتيك العبايات التفاعلي",
        "sicon-store",
        IMG["boutique"],
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "بوتيك العبايات التفاعلي", "Virtual Abaya Boutique"),
            multilang(
                f"{p}desc",
                "الوصف",
                "تجولي في البوتيك واكتشفي المناطق التفاعلية.",
                "Explore the boutique and discover interactive zones.",
                "textarea",
                "300",
            ),
            image(f"{p}map_image", "صورة خريطة البوتيك", IMG["boutique"]),
            boolean(f"{p}enable_pulse", "تفعيل نبض النقاط", True),
            collection(
                f"{p}hotspots",
                "نقطة",
                [
                    multilang("spot_name", "اسم المنطقة", "كلاسيك", "Classic"),
                    multilang(
                        "spot_desc",
                        "الوصف",
                        "عبايات كلاسيكية بقصص أنيقة",
                        "Classic abayas with elegant cuts",
                        "textarea",
                        "300",
                    ),
                    number("pos_x", "الموضع الأفقي %", 30, 0, 100, "%"),
                    number("pos_y", "الموضع العمودي %", 45, 0, 100, "%"),
                    image("spot_image", "صورة المنطقة", IMG["abaya1"]),
                    variable_list("spot_url", "رابط المنطقة"),
                    multilang("spot_btn", "نص الزر", "استكشفي", "Explore"),
                    color("spot_color", "لون النقطة", "#8b5e4b"),
                    radio(
                        "card_dir",
                        "اتجاه البطاقة",
                        [("يمين", "right"), ("يسار", "left"), ("أعلى", "top"), ("أسفل", "bottom")],
                        "right",
                    ),
                    *hotspot_product_fields(),
                ],
                [
                    {
                        "spot_name": {"ar": "كلاسيك", "en": "Classic"},
                        "spot_desc": {
                            "ar": "عبايات كلاسيكية بقصص أنيقة",
                            "en": "Classic abayas with elegant cuts",
                        },
                        "pos_x": 28,
                        "pos_y": 42,
                        "spot_image": IMG["abaya1"],
                        "spot_url": {"type": "custom", "url": "/categories/classic"},
                        "spot_btn": {"ar": "استكشفي", "en": "Explore"},
                        "spot_color": "#8b5e4b",
                        "card_dir": [{"label": "يمين", "value": "right"}],
                        # Form-builder expects selected[] shape inside collection items
                        "products": [
                            {
                                "key": "latest",
                                "label": "أحدث المنتجات",
                                "value": "latest",
                            }
                        ],
                        "chosen_products": [],
                        "category": [],
                        "products_limit": 6,
                        "demo_products": demo_products(
                            [
                                ("عباية ندى", "Nada abaya", IMG["abaya1"], 480, 560, "/products/nada"),
                                ("عباية ليلى", "Layla abaya", IMG["abaya4"], 520, 0, "/products/layla"),
                                ("عباية سارة", "Sara abaya", IMG["abaya3"], 450, 510, "/products/sara"),
                            ]
                        ),
                    },
                    {
                        "spot_name": {"ar": "سهرة", "en": "Evening"},
                        "spot_desc": {
                            "ar": "تصاميم فاخرة للمناسبات",
                            "en": "Luxury designs for occasions",
                        },
                        "pos_x": 62,
                        "pos_y": 55,
                        "spot_image": IMG["abaya2"],
                        "spot_url": {"type": "custom", "url": "/categories/evening"},
                        "spot_btn": {"ar": "استكشفي", "en": "Explore"},
                        "spot_color": "#6b4c3b",
                        "card_dir": [{"label": "يسار", "value": "left"}],
                        "products": [
                            {
                                "key": "sales",
                                "label": "الأكثر مبيعا",
                                "value": "sales",
                            }
                        ],
                        "chosen_products": [],
                        "category": [],
                        "products_limit": 6,
                        "demo_products": demo_products(
                            [
                                ("عباية سهرة", "Evening abaya", IMG["abaya2"], 690, 790, "/products/evening"),
                                ("عباية مطرزة", "Embroidered abaya", IMG["abaya4"], 750, 0, "/products/emb"),
                            ]
                        ),
                    },
                    {
                        "spot_name": {"ar": "صيفي", "en": "Summer"},
                        "spot_desc": {
                            "ar": "أقمشة خفيفة للأجواء الحارة",
                            "en": "Light fabrics for warm weather",
                        },
                        "pos_x": 48,
                        "pos_y": 72,
                        "spot_image": IMG["abaya3"],
                        "spot_url": {"type": "custom", "url": "/categories/summer"},
                        "spot_btn": {"ar": "استكشفي", "en": "Explore"},
                        "spot_color": "#a67c52",
                        "card_dir": [{"label": "أعلى", "value": "top"}],
                        "products": [
                            {
                                "key": "latest",
                                "label": "أحدث المنتجات",
                                "value": "latest",
                            }
                        ],
                        "chosen_products": [],
                        "category": [],
                        "products_limit": 6,
                        "demo_products": demo_products(
                            [
                                ("عباية صيف", "Summer abaya", IMG["abaya3"], 390, 0, "/products/summer"),
                                ("عباية خفيفة", "Light abaya", IMG["abaya1"], 420, 480, "/products/light"),
                            ]
                        ),
                    },
                ],
                1,
                20,
                True,
            ),
            *theme_fields(p),
        ],
    )


def build_acm():
    p = "acm_"

    def compare_attrs(items):
        """items: list of (label_ar, label_en, value_ar, value_en)"""
        return [
            {
                "label": {"ar": label_ar, "en": label_en},
                "value": {"ar": value_ar, "en": value_en},
            }
            for label_ar, label_en, value_ar, value_en in items
        ]

    attr_fields = [
        multilang("label", "المعيار", "القماش", "Fabric", desc="مثل: القماش، الموسم، المناسبة"),
        multilang("value", "قيمة المقارنة", "", "", desc="القيمة المعروضة لهذا المنتج في جدول المقارنة"),
    ]

    return component(
        "abaya-comparison-arena",
        "مقارنة العبايات",
        "sicon-scale-balanced",
        IMG["compare"],
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "مقارنة العبايات", "Abaya Comparison Arena"),
            multilang(
                f"{p}desc",
                "الوصف",
                "اختاري منتجات متجرك وأضيفي قيم المقارنة لكل منتج — الزائرة تختار وتقارن.",
                "Pick store products and set comparison values per product — shoppers select and compare.",
                "textarea",
                "300",
            ),
            multilang(
                f"{p}select_hint",
                "تلميح الاختيار",
                "اختاري من 2 إلى 3 عبايات ثم اضغطي قارني",
                "Pick 2 to 3 abayas, then tap Compare",
            ),
            multilang(
                f"{p}user_hint",
                "تلميح جدول المقارنة",
                "السعر من المتجر تلقائيًا — وبقية المقارنة من إعدادات كل منتج",
                "Price comes from the store — other rows come from each product’s settings",
            ),
            multilang(f"{p}compare_btn", "نص زر المقارنة", "قارني", "Compare"),
            multilang(f"{p}clear_btn", "نص مسح الكل", "مسح الكل", "Clear all"),
            text(f"{p}currency", "العملة", "ر.س", max_len="20"),
            collection(
                f"{p}products",
                "منتج",
                [
                    products_picker(
                        "product",
                        "اختر المنتج",
                        multichoice=True,
                        required=True,
                        max_length=1,
                        min_length=1,
                    ),
                    multilang("btn_text", "نص زر العرض", "عرض", "View"),
                    collection(
                        "attributes",
                        "خاصية مقارنة",
                        attr_fields,
                        [],
                        0,
                        16,
                        False,
                    ),
                ],
                [
                    {
                        "name": {"ar": "عباية كلاسيك", "en": "Classic abaya"},
                        "image": IMG["abaya1"],
                        "price": 450,
                        "old_price": 550,
                        "url": {"type": "custom", "url": "/products/classic-abaya"},
                        "btn_text": {"ar": "عرض", "en": "View"},
                        "attributes": compare_attrs(
                            [
                                ("القماش", "Fabric", "كريب ناعم", "Soft crepe"),
                                ("الإغلاق", "Closure", "أزرار أمامية", "Front buttons"),
                                ("الموسم", "Season", "كل المواسم", "All seasons"),
                                ("المناسبة", "Occasion", "يومي", "Everyday"),
                                ("المقاسات", "Sizes", "S – XL", "S – XL"),
                                ("الألوان", "Colors", "أسود، كحلي", "Black, navy"),
                            ]
                        ),
                    },
                    {
                        "name": {"ar": "عباية سهرة", "en": "Evening abaya"},
                        "image": IMG["abaya2"],
                        "price": 680,
                        "old_price": 780,
                        "url": {"type": "custom", "url": "/products/evening-abaya"},
                        "btn_text": {"ar": "عرض", "en": "View"},
                        "attributes": compare_attrs(
                            [
                                ("القماش", "Fabric", "شيفون مطرز", "Embroidered chiffon"),
                                ("الإغلاق", "Closure", "سحاب خفي", "Hidden zipper"),
                                ("الموسم", "Season", "شتاء", "Winter"),
                                ("المناسبة", "Occasion", "سهرة", "Evening"),
                                ("المقاسات", "Sizes", "M – XXL", "M – XXL"),
                                ("الألوان", "Colors", "أسود، ذهبي", "Black, gold"),
                            ]
                        ),
                    },
                    {
                        "name": {"ar": "عباية صيفية", "en": "Summer abaya"},
                        "image": IMG["abaya3"],
                        "price": 390,
                        "old_price": 0,
                        "url": {"type": "custom", "url": "/products/summer-abaya"},
                        "btn_text": {"ar": "عرض", "en": "View"},
                        "attributes": compare_attrs(
                            [
                                ("القماش", "Fabric", "كتان خفيف", "Light linen"),
                                ("الإغلاق", "Closure", "ربطة خصر", "Waist tie"),
                                ("الموسم", "Season", "صيف", "Summer"),
                                ("المناسبة", "Occasion", "كاجوال", "Casual"),
                                ("المقاسات", "Sizes", "XS – L", "XS – L"),
                                ("الألوان", "Colors", "بيج، أبيض", "Beige, white"),
                            ]
                        ),
                    },
                ],
                2,
                20,
                True,
            ),
            collection(
                f"{p}criteria",
                "ترتيب صفوف المقارنة",
                [
                    multilang(
                        "label",
                        "عنوان الصف",
                        "القماش",
                        "Fabric",
                        desc="يجب أن يطابق اسم المعيار داخل خصائص المنتج",
                    ),
                ],
                [
                    {"label": {"ar": "القماش", "en": "Fabric"}},
                    {"label": {"ar": "الإغلاق", "en": "Closure"}},
                    {"label": {"ar": "الموسم", "en": "Season"}},
                    {"label": {"ar": "المناسبة", "en": "Occasion"}},
                    {"label": {"ar": "المقاسات", "en": "Sizes"}},
                    {"label": {"ar": "الألوان", "en": "Colors"}},
                ],
                0,
                16,
                False,
            ),
            *theme_fields(p),
        ],
    )


def build_alb():
    p = "alb_"

    return component(
        "abaya-look-builder",
        "منسقة الإطلالة",
        "sicon-magic-wand",
        IMG["look"],
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "منسقة الإطلالة", "Look Builder"),
            multilang(
                f"{p}desc",
                "الوصف",
                "اختاري منتجات متجرك، ثم دعمي الزائرة تبني إطلالتها من التبويبات.",
                "Pick store products, then let shoppers build a look from the tabs.",
                "textarea",
                "300",
            ),
            static_title(f"{p}tabs_title", "تبويبات الإطلالة"),
            collection(
                f"{p}tabs",
                "تبويب",
                [
                    multilang(
                        "group_name",
                        "اسم التبويب",
                        "العباية",
                        "Abaya",
                        desc="يظهر كتبويب في الواجهة (مثل: العباية، الحجاب، الحقيبة)",
                    ),
                    number("group_order", "ترتيب التبويب", 1, 0, 99, ""),
                    products_picker(
                        "products",
                        "منتجات التبويب",
                        multichoice=True,
                        required=False,
                        max_length=12,
                        min_length=0,
                        desc="اختاري عدة منتجات لهذا التبويب",
                    ),
                ],
                [
                    {
                        "group_name": {"ar": "العباية", "en": "Abaya"},
                        "group_order": 1,
                        "products": [],
                    },
                    {
                        "group_name": {"ar": "الحجاب", "en": "Hijab"},
                        "group_order": 2,
                        "products": [],
                    },
                    {
                        "group_name": {"ar": "الإكسسوار", "en": "Accessory"},
                        "group_order": 3,
                        "products": [],
                    },
                ],
                1,
                12,
                False,
            ),
            static_title(f"{p}summary_title", "ملخص الإطلالة"),
            multilang(
                f"{p}cart_btn",
                "نص زر الإضافة للسلة",
                "أضيفي إلى السلة",
                "Add to cart",
            ),
            multilang(f"{p}copy_btn", "نص زر النسخ", "نسخ التفاصيل", "Copy details"),
            multilang(f"{p}view_btn", "نص زر العرض", "عرض المختار", "View selected"),
            static_title(f"{p}source_title", "مصدر إضافي (اختياري)"),
            *product_source_fields(
                f"{p}products",
                chosen_id=f"{p}chosen_products",
                category_id=f"{p}category",
                limit_id=f"{p}products_limit",
                limit_default=12,
                include_none=True,
                default_source="none",
                extra_when_active=[
                    multilang(
                        f"{p}import_group_name",
                        "اسم تبويب الاستيراد",
                        "المنتجات",
                        "Products",
                        desc="يُعرض كتبويب إضافي للمنتجات المجلوبة تلقائيًا",
                    ),
                    number(
                        f"{p}import_group_order",
                        "ترتيب تبويب الاستيراد",
                        99,
                        0,
                        99,
                        "",
                    ),
                ],
            ),
            *theme_fields(p),
        ],
    )


def build_acfg():
    p = "acfg_"
    return component(
        "abaya-configurator",
        "مصممة العباية التفاعلية",
        "sicon-pencil-ruler",
        IMG["config"],
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "مصممة العباية التفاعلية", "Abaya Configurator"),
            multilang(
                f"{p}desc",
                "الوصف",
                "صمّمي عباءتك باختيار القماش والتطريز والأكمام، أو ابدئي بالخيار الموصى به.",
                "Design your abaya by choosing fabric, embroidery, and sleeves — or start with the recommended look.",
                "textarea",
                "300",
            ),
            text(f"{p}currency", "العملة", "ر.س"),
            number(f"{p}base_price", "السعر الأساسي", 350, 0, 99999, "ر.س"),
            boolean(f"{p}show_price", "إظهار السعر", True),
            image(f"{p}base_image", "الصورة الأساسية", IMG["abaya1"]),
            variable_list(f"{p}product_url", "رابط المنتج"),
            radio(
                f"{p}preview_side",
                "موضع المعاينة",
                [("يمين", "right"), ("يسار", "left")],
                "right",
            ),
            text(f"{p}whatsapp", "رقم واتساب", "966500000000", icon="sicon-whatsapp"),
            multilang(
                f"{p}whatsapp_msg",
                "رسالة واتساب",
                "أرغب في هذا التصميم",
                "I would like this design",
                "textarea",
                "300",
            ),
            multilang(f"{p}finish_btn", "نص زر فتح المنتج", "فتح المنتج", "Open product"),
            multilang(
                f"{p}recommend_btn",
                "نص زر الموصى به",
                "اختاري الموصى به",
                "Choose recommended",
            ),
            collection(
                f"{p}options",
                "خيار",
                [
                    multilang("group_name", "اسم المجموعة", "القماش", "Fabric", desc="الخيارات بنفس الاسم تظهر معاً في مجموعة واحدة (مثل: القماش، الأكمام)"),
                    number("group_order", "ترتيب المجموعة", 1, 0, 99, ""),
                    multilang("option_name", "اسم الخيار", "شيفون", "Chiffon"),
                    image("overlay_image", "صورة الطبقة", IMG["fabric"]),
                    number("price_delta", "فرق السعر", 0, 0, 5000, "ر.س"),
                    boolean(
                        "is_default",
                        "موصى به",
                        False,
                        "يظهر كخيار موصى به ويُطبَّق عند الضغط على زر الموصى به.",
                    ),
                    multilang("option_desc", "وصف الخيار", "خفيف وناعم", "Light and soft", "textarea", "200"),
                    image("thumb_image", "صورة مصغّرة", IMG["fabric"]),
                    color("swatch_color", "لون العينة", "#1a1a1a"),
                ],
                [
                    {
                        "group_name": {"ar": "القماش", "en": "Fabric"},
                        "group_order": 1,
                        "option_name": {"ar": "شيفون", "en": "Chiffon"},
                        "overlay_image": IMG["abaya1"],
                        "price_delta": 0,
                        "is_default": True,
                        "option_desc": {"ar": "خفيف وناعم", "en": "Light and soft"},
                        "thumb_image": IMG["abaya1"],
                        "swatch_color": "#1a1a1a",
                    },
                    {
                        "group_name": {"ar": "القماش", "en": "Fabric"},
                        "group_order": 1,
                        "option_name": {"ar": "كريب", "en": "Crepe"},
                        "overlay_image": IMG["abaya2"],
                        "price_delta": 50,
                        "option_desc": {"ar": "متين وعملي", "en": "Durable and practical"},
                        "thumb_image": IMG["abaya2"],
                        "swatch_color": "#2c2c2c",
                    },
                    {
                        "group_name": {"ar": "الأكمام", "en": "Sleeves"},
                        "group_order": 2,
                        "option_name": {"ar": "أكمام عادية", "en": "Plain sleeves"},
                        "overlay_image": IMG["abaya3"],
                        "price_delta": 0,
                        "is_default": True,
                        "thumb_image": IMG["abaya3"],
                        "swatch_color": "#8b5e4b",
                    },
                    {
                        "group_name": {"ar": "الأكمام", "en": "Sleeves"},
                        "group_order": 2,
                        "option_name": {"ar": "أكمام مطرّزة", "en": "Embroidered sleeves"},
                        "overlay_image": IMG["abaya4"],
                        "price_delta": 120,
                        "option_desc": {"ar": "تطريز يدوي فاخر", "en": "Luxury hand embroidery"},
                        "thumb_image": IMG["abaya4"],
                        "swatch_color": "#c9a86c",
                    },
                    {
                        "group_name": {"ar": "الحواف", "en": "Trim"},
                        "group_order": 3,
                        "option_name": {"ar": "حافة ذهبية", "en": "Gold trim"},
                        "overlay_image": IMG["look"],
                        "price_delta": 80,
                        "is_default": True,
                        "thumb_image": IMG["look"],
                        "swatch_color": "#d4af37",
                    },
                    {
                        "group_name": {"ar": "الحواف", "en": "Trim"},
                        "group_order": 3,
                        "option_name": {"ar": "حافة فضية", "en": "Silver trim"},
                        "overlay_image": IMG["config"],
                        "price_delta": 80,
                        "thumb_image": IMG["config"],
                        "swatch_color": "#c0c0c0",
                    },
                ],
                2,
                50,
                True,
            ),
            *theme_fields(p),
        ],
    )


def build_es():
    """رواق الشهادات — customer reviews / testimonials."""
    p = "es_"
    return component(
        "echo-salon",
        "رواق الشهادات",
        "sicon-chat",
        IMG["look"],
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "رواق الشهادات", "Testimony Arcade"),
            multilang(
                f"{p}desc",
                "الوصف",
                "همسات الزبونات الحقيقيات — آراء تُلهم اختياركِ بثقة.",
                "Real customer whispers — reviews that inspire confident choices.",
                "textarea",
                "300",
            ),
            boolean(f"{p}autoplay", "تبديل تلقائي للشهادات", True),
            collection(
                f"{p}reviews",
                "شهادة",
                [
                    multilang("name", "الاسم", "نورة العتيبي", "Noura Alotaibi"),
                    multilang("role", "المدينة / الدور", "الرياض", "Riyadh"),
                    image("avatar", "الصورة", IMG["abaya4"]),
                    number("rating", "التقييم من 5", 5, 1, 5, ""),
                    multilang(
                        "quote",
                        "نص الشهادة",
                        "القماش فاخر والقصة مضبوطة تمامًا — أحسستُ بالأناقة من أول ارتداء.",
                        "The fabric feels luxurious and the cut is perfect — elegance from the first wear.",
                        "textarea",
                        "400",
                    ),
                    multilang("product_note", "ملاحظة المنتج", "عباية ندى الكلاسيكية", "Nada classic abaya"),
                ],
                [
                    {
                        "name": {"ar": "نورة العتيبي", "en": "Noura Alotaibi"},
                        "role": {"ar": "الرياض", "en": "Riyadh"},
                        "avatar": IMG["abaya4"],
                        "rating": 5,
                        "quote": {
                            "ar": "القماش فاخر والقصة مضبوطة تمامًا — أحسستُ بالأناقة من أول ارتداء.",
                            "en": "The fabric feels luxurious and the cut is perfect — elegance from the first wear.",
                        },
                        "product_note": {"ar": "عباية ندى الكلاسيكية", "en": "Nada classic abaya"},
                    },
                    {
                        "name": {"ar": "لمى الشهري", "en": "Lama Alshehri"},
                        "role": {"ar": "جدة", "en": "Jeddah"},
                        "avatar": IMG["abaya2"],
                        "rating": 5,
                        "quote": {
                            "ar": "التغليف راقٍ والتطريز ناعم جدًا. طلبتُ مقاسًا بناءً على الدليل وكان مثاليًا.",
                            "en": "Elegant packaging and soft embroidery. The size guide helped me order a perfect fit.",
                        },
                        "product_note": {"ar": "عباية سهرة مطرزة", "en": "Embroidered evening abaya"},
                    },
                    {
                        "name": {"ar": "هند القحطاني", "en": "Hind Alqahtani"},
                        "role": {"ar": "الدمام", "en": "Dammam"},
                        "avatar": IMG["abaya3"],
                        "rating": 4,
                        "quote": {
                            "ar": "خفيفة ومناسبة للصيف دون أن تفقد وقار الإطلالة.",
                            "en": "Light for summer without losing a polished look.",
                        },
                        "product_note": {"ar": "عباية صيفية", "en": "Summer abaya"},
                    },
                ],
                1,
                24,
                True,
            ),
            *theme_fields(p),
        ],
    )


def build_sfr():
    """طقوس القياس — size guide + how to measure."""
    p = "sfr_"
    return component(
        "silhouette-fit-ritual",
        "طقوس القياس",
        "sicon-ruler",
        IMG["compare"],
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "طقوس القياس", "Silhouette Fit Ritual"),
            multilang(
                f"{p}desc",
                "الوصف",
                "خطوات واضحة لأخذ المقاسات، مع جدول يساعدكِ تختاري بثقة.",
                "Clear steps to take your measurements, plus a chart for confident sizing.",
                "textarea",
                "300",
            ),
            multilang(
                f"{p}steps_title",
                "عنوان خطوات القياس",
                "كيف تأخذين مقاساتك",
                "How to take your measurements",
            ),
            multilang(
                f"{p}chart_title",
                "عنوان جدول المقاسات",
                "دليل المقاسات",
                "Size chart",
            ),
            multilang(
                f"{p}chart_note",
                "ملاحظة تحت الجدول",
                "الأرقام بالسنتيمتر. إذا كنتِ بين مقاسين، اختاري الأكبر للراحة.",
                "Numbers are in cm. If between sizes, choose the larger for comfort.",
                "textarea",
                "300",
            ),
            collection(
                f"{p}steps",
                "خطوة",
                [
                    multilang("title", "عنوان الخطوة", "محيط الصدر", "Bust"),
                    multilang(
                        "desc",
                        "الوصف",
                        "لُفّي شريط القياس حول أوسع نقطة في الصدر، مع استقامة الظهر.",
                        "Wrap the tape around the fullest part of the bust, keeping your back straight.",
                        "textarea",
                        "300",
                    ),
                    image("image", "صورة توضيحية", IMG["config"]),
                    multilang(
                        "tip",
                        "نصيحة",
                        "لا تشدّي الشريط — اتركي مسافة إصبع للراحة.",
                        "Don't pull the tape tight — leave a finger of ease.",
                        "textarea",
                        "200",
                    ),
                ],
                [
                    {
                        "title": {"ar": "محيط الصدر", "en": "Bust"},
                        "desc": {
                            "ar": "لُفّي شريط القياس حول أوسع نقطة في الصدر، مع استقامة الظهر.",
                            "en": "Wrap the tape around the fullest part of the bust, keeping your back straight.",
                        },
                        "image": IMG["config"],
                        "tip": {
                            "ar": "لا تشدّي الشريط — اتركي مسافة إصبع للراحة.",
                            "en": "Don't pull the tape tight — leave a finger of ease.",
                        },
                    },
                    {
                        "title": {"ar": "محيط الخصر", "en": "Waist"},
                        "desc": {
                            "ar": "قِيسي أضيق نقطة في الخصر الطبيعي، عادة فوق السرة بقليل.",
                            "en": "Measure the narrowest point of your natural waist, usually just above the navel.",
                        },
                        "image": IMG["look"],
                        "tip": {
                            "ar": "تنفسي بشكل طبيعي أثناء القياس.",
                            "en": "Breathe naturally while measuring.",
                        },
                    },
                    {
                        "title": {"ar": "محيط الورك", "en": "Hips"},
                        "desc": {
                            "ar": "لُفّي الشريط حول أوسع نقطة في الورك والمقعدة.",
                            "en": "Wrap the tape around the fullest part of the hips and seat.",
                        },
                        "image": IMG["abaya1"],
                        "tip": {
                            "ar": "قفي بقدمين متقاربتين للحصول على رقم أدق.",
                            "en": "Stand with feet together for a more accurate number.",
                        },
                    },
                    {
                        "title": {"ar": "طول العباية", "en": "Abaya length"},
                        "desc": {
                            "ar": "من أعلى الكتف مرورًا بالصدر حتى النقطة المطلوبة فوق الأرض.",
                            "en": "From the top of the shoulder over the bust down to your preferred hem point.",
                        },
                        "image": IMG["compare"],
                        "tip": {
                            "ar": "ارتدي الحذاء الذي تخططين له مع العباية.",
                            "en": "Wear the shoes you plan to style with the abaya.",
                        },
                    },
                ],
                1,
                12,
                True,
            ),
            collection(
                f"{p}sizes",
                "مقاس",
                [
                    multilang("size_label", "المقاس", "50", "50"),
                    text("bust", "الصدر (سم)", "96"),
                    text("waist", "الخصر (سم)", "80"),
                    text("hips", "الورك (سم)", "104"),
                    text("length", "الطول (سم)", "150"),
                    multilang("note", "ملاحظة", "", ""),
                ],
                [
                    {
                        "size_label": {"ar": "50", "en": "50"},
                        "bust": "96",
                        "waist": "80",
                        "hips": "104",
                        "length": "150",
                    },
                    {
                        "size_label": {"ar": "52", "en": "52"},
                        "bust": "100",
                        "waist": "84",
                        "hips": "108",
                        "length": "155",
                    },
                    {
                        "size_label": {"ar": "54", "en": "54"},
                        "bust": "104",
                        "waist": "88",
                        "hips": "112",
                        "length": "160",
                    },
                    {
                        "size_label": {"ar": "56", "en": "56"},
                        "bust": "108",
                        "waist": "92",
                        "hips": "116",
                        "length": "165",
                    },
                    {
                        "size_label": {"ar": "58", "en": "58"},
                        "bust": "112",
                        "waist": "96",
                        "hips": "120",
                        "length": "170",
                        "note": {"ar": "مقاس واسع مريح", "en": "Relaxed fit"},
                    },
                ],
                1,
                24,
                True,
            ),
            *theme_fields(p),
        ],
    )


def build_ip():
    """ديوان الأسئلة — FAQ accordion."""
    p = "ip_"
    return component(
        "inquiry-parlour",
        "ديوان الأسئلة",
        "sicon-help",
        IMG["care"],
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "ديوان الأسئلة", "Questions Diwan"),
            multilang(
                f"{p}desc",
                "الوصف",
                "إجابات واضحة لأكثر ما تسأله زبوناتنا قبل الشراء.",
                "Clear answers to what our customers ask most before buying.",
                "textarea",
                "300",
            ),
            boolean(f"{p}show_search", "إظهار البحث", True),
            collection(
                f"{p}items",
                "سؤال",
                [
                    multilang(
                        "question",
                        "السؤال",
                        "كيف أختار المقاس المناسب؟",
                        "How do I choose the right size?",
                        "textarea",
                        "200",
                    ),
                    multilang(
                        "answer",
                        "الجواب",
                        "استخدمي جدول المقاسات في صفحة المنتج، أو طقوس القياس في المتجر. إذا كنتِ بين مقاسين اختاري الأكبر.",
                        "Use the size chart on the product page or our Fit Ritual guide. If between sizes, choose the larger one.",
                        "textarea",
                        "500",
                    ),
                    multilang("category", "التصنيف", "المقاسات", "Sizing"),
                ],
                [
                    {
                        "question": {
                            "ar": "كيف أختار المقاس المناسب؟",
                            "en": "How do I choose the right size?",
                        },
                        "answer": {
                            "ar": "استخدمي جدول المقاسات في صفحة المنتج، أو طقوس القياس في المتجر. إذا كنتِ بين مقاسين اختاري الأكبر.",
                            "en": "Use the size chart on the product page or our Fit Ritual guide. If between sizes, choose the larger one.",
                        },
                        "category": {"ar": "المقاسات", "en": "Sizing"},
                    },
                    {
                        "question": {
                            "ar": "ما مدة التوصيل؟",
                            "en": "How long does delivery take?",
                        },
                        "answer": {
                            "ar": "عادةً من 2 إلى 5 أيام عمل داخل المملكة حسب المدينة وشركة الشحن.",
                            "en": "Usually 2–5 business days within the Kingdom, depending on city and courier.",
                        },
                        "category": {"ar": "الشحن", "en": "Shipping"},
                    },
                    {
                        "question": {
                            "ar": "هل يمكنني الإرجاع أو الاستبدال؟",
                            "en": "Can I return or exchange?",
                        },
                        "answer": {
                            "ar": "نعم خلال المدة الموضحة في سياسة المتجر، بشرط أن تكون القطعة بحالتها الأصلية مع البطاقة.",
                            "en": "Yes within the store policy window, provided the piece is unused with tags attached.",
                        },
                        "category": {"ar": "الإرجاع", "en": "Returns"},
                    },
                    {
                        "question": {
                            "ar": "كيف أعتني بالعباية؟",
                            "en": "How do I care for the abaya?",
                        },
                        "answer": {
                            "ar": "راجعي بطاقة العناية على القطعة، أو استخدمي مساعد العناية في المتجر حسب نوع القماش.",
                            "en": "Check the care label, or use our in-store care assistant by fabric type.",
                        },
                        "category": {"ar": "العناية", "en": "Care"},
                    },
                ],
                1,
                40,
                True,
            ),
            *theme_fields(p),
        ],
    )


def build_amm():
    p = "amm_"
    seq = cond_eq(f"{p}mode", "sequence")
    vid = cond_eq(f"{p}mode", "video")
    frame_guide = (
        "استخدم من 8 إلى 24 صورة بأبعاد موحدة وخلفية ثابتة. "
        "يفضّل WebP بعد الضغط، وصوّر الحركة بتسلسل منتظم. "
        "ترتيب السجلات في هذه القائمة هو ترتيب الإطارات."
    )

    demo_frames = [
        {
            "image": IMG["abaya1"],
            "alt": {"ar": "إطار حركة 1", "en": "Motion frame 1"},
            "title": {"ar": "بداية المشي", "en": "Walk start"},
            "desc": {"ar": "لاحظي انسيابية القماش من الأمام", "en": "Notice the fabric flow from the front"},
            "show_info": True,
            "btn_text": {"ar": "تفاصيل", "en": "Details"},
        },
        {
            "image": IMG["abaya2"],
            "alt": {"ar": "إطار حركة 2", "en": "Motion frame 2"},
            "show_info": False,
        },
        {
            "image": IMG["abaya3"],
            "alt": {"ar": "إطار حركة 3", "en": "Motion frame 3"},
            "title": {"ar": "اتساع الأكمام", "en": "Sleeve width"},
            "desc": {"ar": "حركة الأكمام أثناء الالتفاف", "en": "Sleeve motion while turning"},
            "show_info": True,
        },
        {
            "image": IMG["abaya4"],
            "alt": {"ar": "إطار حركة 4", "en": "Motion frame 4"},
            "show_info": False,
        },
        {
            "image": IMG["look"],
            "alt": {"ar": "إطار حركة 5", "en": "Motion frame 5"},
            "title": {"ar": "تفاصيل الخلف", "en": "Back detail"},
            "desc": {"ar": "سقوط القماش من الخلف", "en": "Fabric fall at the back"},
            "show_info": True,
        },
        {
            "image": IMG["config"],
            "alt": {"ar": "إطار حركة 6", "en": "Motion frame 6"},
            "show_info": False,
        },
        {
            "image": IMG["compare"],
            "alt": {"ar": "إطار حركة 7", "en": "Motion frame 7"},
            "show_info": False,
        },
        {
            "image": IMG["care"],
            "alt": {"ar": "إطار حركة 8", "en": "Motion frame 8"},
            "title": {"ar": "نهاية الدوران", "en": "End of turn"},
            "desc": {"ar": "استقرار القصة بعد الحركة", "en": "Cut settles after motion"},
            "show_info": True,
        },
    ]

    return component(
        "abaya-motion-mirror",
        "مرآة حركة العباية",
        "sicon-camera",
        IMG["look"],
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "مرآة حركة العباية", "Abaya Motion Mirror"),
            multilang(
                f"{p}section_desc",
                "وصف القسم",
                "اسحبي لرؤية انسيابية العباية أثناء الحركة.",
                "Drag to see how the abaya flows in motion.",
                "textarea",
                "300",
            ),
            dropdown_manual(
                f"{p}mode",
                "نوع العرض",
                [("تسلسل صور", "sequence"), ("فيديو قابل للتحكم", "video")],
                "sequence",
                icon="sicon-video",
            ),
            static_title(f"{p}frames_title", "إطارات الحركة", seq),
            collection(
                f"{p}frames",
                "إطار",
                [
                    image(
                        "image",
                        "صورة الإطار",
                        "",
                        desc=frame_guide,
                        required=True,
                    ),
                    multilang("alt", "النص البديل", "إطار حركة العباية", "Abaya motion frame"),
                    multilang("title", "عنوان لحظي", "", ""),
                    multilang("desc", "وصف لحظي", "", "", "textarea", "200"),
                    boolean("show_info", "إظهار بطاقة معلومة عند هذا الإطار", False),
                    variable_list("url", "رابط اختياري"),
                    multilang("btn_text", "نص الزر", "تفاصيل", "Details"),
                ],
                demo_frames,
                1,
                24,
                False,
                seq,
            ),
            static_title(f"{p}video_title", "إعدادات الفيديو", vid),
            text(
                f"{p}video_url",
                "رابط الفيديو المباشر",
                "",
                max_len="500",
                desc="رابط ملف فيديو مباشر (mp4/webm) — ليس رابط صفحة يوتيوب",
                conditions=vid,
            ),
            image(f"{p}poster", "صورة Poster", IMG["abaya1"], conditions=vid),
            boolean(f"{p}video_autoplay", "تشغيل تلقائي للفيديو", False, conditions=vid),
            boolean(f"{p}video_loop", "تكرار الفيديو", True, conditions=vid),
            boolean(f"{p}video_muted", "كتم الصوت", True, conditions=vid),
            dropdown_manual(
                f"{p}video_speed",
                "سرعة التشغيل",
                [("0.5", "0.5"), ("0.75", "0.75"), ("1", "1")],
                "1",
                conditions=vid,
            ),
            number(f"{p}video_start", "بداية التشغيل (ثانية)", 0, 0, 600, "", conditions=vid),
            number(f"{p}video_end", "نهاية التشغيل (ثانية)", 0, 0, 600, "0 = حتى النهاية", conditions=vid),
            boolean(f"{p}video_scrub", "السماح بالسحب للتحكم في الوقت", True, conditions=vid),
            static_title(f"{p}motion_title", "إعدادات الصور والحركة", seq),
            dropdown_manual(
                f"{p}fps",
                "سرعة تشغيل الإطارات",
                [("1 FPS (بطيء)", "1"), ("2 FPS", "2"), ("3 FPS", "3"), ("4 FPS", "4")],
                "1",
                conditions=seq,
            ),
            boolean(f"{p}loop", "تفعيل الدوران المستمر", True, conditions=seq),
            boolean(
                f"{p}autoplay",
                "تفعيل التشغيل التلقائي",
                True,
                desc="يشغّل تسلسل الحركة تلقائياً عند ظهور العنصر — بدون أزرار تشغيل في الواجهة",
            ),
            boolean(f"{p}stop_on_interact", "إيقاف التشغيل عند التفاعل", True),
            dropdown_manual(
                f"{p}aspect",
                "نسبة أبعاد العارض",
                [("3:4", "3/4"), ("1:1", "1/1"), ("4:5", "4/5"), ("16:9", "16/9")],
                "3/4",
            ),
            boolean(f"{p}enable_fs", "تفعيل ملء الشاشة", True),
            boolean(f"{p}enable_captions", "تفعيل المعلومات اللحظية", True, conditions=seq),
            boolean(f"{p}show_hint", "إظهار تلميح الاستخدام", True),
            image(f"{p}placeholder", "صورة Placeholder", "", conditions=seq),
            boolean(f"{p}animate", "تفعيل الحركات", True),
            static_title(f"{p}info_title", "معلومات العباية"),
            multilang(f"{p}name", "اسم العباية", "عباية ندى الانسيابية", "Nada Flow Abaya"),
            multilang(
                f"{p}desc",
                "وصف العباية",
                "قصة مريحة بانسيابية واضحة أثناء المشي والدوران.",
                "A relaxed cut with clear flow while walking and turning.",
                "textarea",
                "300",
            ),
            multilang(f"{p}fabric", "اسم الخامة", "كريب ناعم", "Soft crepe"),
            multilang(f"{p}cut", "نوع القصة", "قصة واسعة قليلاً", "Slightly wide cut"),
            static_title(f"{p}meters_title", "مستويات الخصائص"),
            collection(
                f"{p}meters",
                "مؤشر",
                [
                    multilang("name", "اسم المؤشر", "الانسيابية", "Flow"),
                    number("value", "الدرجة", 70, 0, 100, "", desc="من 0 إلى 100"),
                ],
                [
                    {
                        "name": {"ar": "الانسيابية", "en": "Flow"},
                        "value": 78,
                    },
                    {
                        "name": {"ar": "الاتساع", "en": "Width"},
                        "value": 62,
                    },
                ],
                min_len=0,
                max_len=10,
            ),
            multilang(f"{p}sleeves", "وصف الأكمام", "أكمام واسعة بحركة حرة", "Wide free-moving sleeves"),
            variable_list(f"{p}product_url", "رابط المنتج"),
            multilang(f"{p}product_btn", "نص زر المنتج", "عرض المنتج", "View product"),
            multilang(
                f"{p}hint",
                "نص تلميح السحب",
                "اسحبي لرؤية الحركة",
                "Drag to explore the motion",
            ),
            boolean(f"{p}show_frame_num", "إظهار رقم الإطار / الوقت", True),
            boolean(f"{p}show_progress", "إظهار شريط التقدم", True),
            boolean(f"{p}show_controls", "إظهار أدوات التحكم", True),
            boolean(f"{p}show_panel", "إظهار لوحة المعلومات", True),
            dropdown_manual(
                f"{p}panel_side",
                "موضع لوحة المعلومات",
                [("يمين", "right"), ("يسار", "left"), ("أسفل", "bottom")],
                "right",
            ),
            static_title(f"{p}design_title", "إعدادات التصميم"),
            color(f"{p}bg", "لون خلفية القسم", "#faf7f5"),
            color(f"{p}viewer_bg", "لون خلفية العارض", "#1a1614"),
            color(f"{p}text", "لون النص", "#2b211c"),
            color(f"{p}muted", "لون النص الثانوي", "#7a6a62"),
            color(f"{p}accent", "اللون الرئيسي", "#8b5e4b"),
            color(f"{p}progress_color", "لون شريط التقدم", "#8b5e4b"),
            color(f"{p}control_bg", "لون أزرار التحكم", "#ffffff"),
            color(f"{p}info_bg", "لون بطاقات المعلومات", "#ffffff"),
            color(f"{p}viewer_border", "لون حدود العارض", "#e8ddd6"),
            color(f"{p}card", "لون البطاقات", "#ffffff"),
            color(f"{p}border", "لون الحدود", "#e8ddd6"),
            color(f"{p}button_bg", "خلفية الأزرار", "#8b5e4b"),
            color(f"{p}button_color", "لون نص الأزرار", "#ffffff"),
            number(f"{p}radius", "تدوير الحواف", 16, 0, 40, "px"),
            number(f"{p}shadow", "مستوى الظل", 1, 0, 3, ""),
            static_title(f"{p}space_title", "المسافة أعلى وأسفل"),
            number(f"{p}space_desktop", "الكمبيوتر", 48, 0, 250, "px"),
            number(f"{p}space_mobile", "الجوال", 28, 0, 120, "px"),
        ],
    )


def build_als():
    p = "als_"

    def mode(
        name_ar,
        name_en,
        img,
        *,
        default=False,
        shine=50,
        embroidery=50,
        color_depth=50,
        flow=50,
        transparency=20,
        day_fit=50,
        night_fit=50,
        color_ar="أسود",
        color_en="Black",
        notes_ar="",
        notes_en="",
        desc_ar="",
        desc_en="",
    ):
        return {
            "name": {"ar": name_ar, "en": name_en},
            "desc": {"ar": desc_ar, "en": desc_en},
            "image": img,
            "thumb": img,
            "alt": {"ar": name_ar, "en": name_en},
            "is_default": default,
            "shine": shine,
            "embroidery": embroidery,
            "color_depth": color_depth,
            "flow": flow,
            "transparency": transparency,
            "day_fit": day_fit,
            "night_fit": night_fit,
            "color_name": {"ar": color_ar, "en": color_en},
            "notes": {"ar": notes_ar, "en": notes_en},
            "btn_text": {"ar": "مشاهدة المنتج", "en": "View product"},
        }

    return component(
        "abaya-light-studio",
        "استوديو الإضاءة والخامة",
        "sicon-sun",
        IMG["fabric"],
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "استوديو الإضاءة والخامة", "Light & Fabric Studio"),
            multilang(
                f"{p}desc",
                "الوصف",
                "شاهدي العباية تحت ظروف إضاءة حقيقية مختلفة قبل الاختيار.",
                "See the abaya under real lighting conditions before you choose.",
                "textarea",
                "300",
            ),
            image(f"{p}placeholder", "صورة Placeholder", ""),
            dropdown_manual(
                f"{p}aspect",
                "نسبة أبعاد الصورة",
                [("3:4", "3/4"), ("1:1", "1/1"), ("4:5", "4/5"), ("16:9", "16/9")],
                "3/4",
            ),
            number(f"{p}max_width", "أقصى عرض للصورة", 720, 280, 1200, "px"),
            boolean(f"{p}enable_lens", "تفعيل عدسة التكبير (كمبيوتر)", True),
            dropdown_manual(
                f"{p}lens_zoom",
                "مستوى تكبير العدسة",
                [("1.5x", "1.5"), ("2x", "2"), ("2.5x", "2.5"), ("3x", "3")],
                "2",
            ),
            boolean(f"{p}enable_zoom_btns", "تفعيل أزرار التكبير", True),
            boolean(f"{p}enable_compare", "تفعيل المقارنة", True),
            boolean(f"{p}show_metrics", "إظهار المؤشرات", True),
            boolean(f"{p}show_color", "إظهار معلومات اللون", True),
            boolean(f"{p}show_notes", "إظهار ملاحظات التاجر", True),
            boolean(f"{p}show_product", "إظهار رابط المنتج", True),
            multilang(f"{p}default_btn", "النص الافتراضي للزر", "مشاهدة المنتج", "View product"),
            variable_list(f"{p}product_url", "رابط منتج عام (اختياري)"),
            boolean(f"{p}animate", "تفعيل الحركات", True),
            static_title(f"{p}modes_title", "أوضاع الإضاءة"),
            collection(
                f"{p}modes",
                "وضع إضاءة",
                [
                    multilang("name", "اسم وضع الإضاءة", "ضوء النهار", "Daylight"),
                    multilang("desc", "وصف الوضع", "", "", "textarea", "200"),
                    image(
                        "image",
                        "الصورة الرئيسية",
                        "",
                        desc="ارفع صورة حقيقية ملتقطة تحت هذا الإضاءة — لا تعتمد على فلاتر لاحقة",
                        required=True,
                    ),
                    image("thumb", "صورة مصغرة", "", desc="اختياري — إن تُركت فارغة تُستخدم الصورة الرئيسية"),
                    multilang("alt", "النص البديل", "عباية تحت الإضاءة", "Abaya under lighting"),
                    boolean("is_default", "الوضع الافتراضي", False),
                    number("shine", "درجة اللمعان", 50, 0, 100, ""),
                    number("embroidery", "وضوح التطريز", 50, 0, 100, ""),
                    number("color_depth", "عمق اللون", 50, 0, 100, ""),
                    number("flow", "الانسيابية", 50, 0, 100, ""),
                    number("transparency", "مستوى الشفافية", 20, 0, 100, ""),
                    number("day_fit", "ملاءمة النهار", 50, 0, 100, ""),
                    number("night_fit", "ملاءمة المساء", 50, 0, 100, ""),
                    multilang("color_name", "اسم اللون", "أسود مطفي", "Matte black"),
                    multilang("notes", "ملاحظات التاجر", "", "", "textarea", "240"),
                    variable_list("product_url", "رابط المنتج"),
                    multilang("btn_text", "نص الزر", "مشاهدة المنتج", "View product"),
                ],
                [
                    mode(
                        "ضوء النهار",
                        "Daylight",
                        IMG["abaya1"],
                        default=True,
                        shine=35,
                        embroidery=70,
                        color_depth=65,
                        flow=75,
                        transparency=15,
                        day_fit=90,
                        night_fit=40,
                        notes_ar="الأقرب للون الحقيقي تحت الشمس.",
                        notes_en="Closest to true color in daylight.",
                        desc_ar="إضاءة طبيعية نهارية تُظهر اللون الحقيقي.",
                        desc_en="Natural daylight that reveals true color.",
                    ),
                    mode(
                        "إضاءة داخلية",
                        "Indoor light",
                        IMG["abaya2"],
                        shine=45,
                        embroidery=55,
                        color_depth=58,
                        flow=70,
                        day_fit=55,
                        night_fit=60,
                        desc_ar="إضاءة متاجر ومنازل شائعة.",
                        desc_en="Common store and home lighting.",
                    ),
                    mode(
                        "إضاءة مسائية",
                        "Evening light",
                        IMG["abaya3"],
                        shine=60,
                        embroidery=48,
                        color_depth=72,
                        flow=68,
                        day_fit=30,
                        night_fit=88,
                        color_ar="أسود دافئ",
                        color_en="Warm black",
                        desc_ar="دفء الإضاءة المسائية وانعكاسها على القماش.",
                        desc_en="Warm evening light on the fabric.",
                    ),
                    mode(
                        "لقطة مقربة للخامة",
                        "Fabric close-up",
                        IMG["fabric"],
                        shine=50,
                        embroidery=85,
                        color_depth=80,
                        flow=40,
                        transparency=25,
                        day_fit=70,
                        night_fit=70,
                        desc_ar="تفاصيل النسيج والملمس عن قرب.",
                        desc_en="Close look at weave and texture.",
                    ),
                ],
                1,
                20,
                True,
            ),
            static_title(f"{p}design_title", "إعدادات التصميم"),
            color(f"{p}bg", "لون خلفية القسم", "#faf7f5"),
            color(f"{p}stage_bg", "لون مساحة الصورة", "#1a1614"),
            color(f"{p}panel_bg", "لون لوحة التحكم", "#ffffff"),
            color(f"{p}text", "لون النص", "#2b211c"),
            color(f"{p}muted", "لون النص الثانوي", "#7a6a62"),
            color(f"{p}accent", "اللون الرئيسي", "#8b5e4b"),
            color(f"{p}meter_color", "لون المؤشرات", "#8b5e4b"),
            color(f"{p}handle_color", "لون مقبض المقارنة", "#ffffff"),
            color(f"{p}thumb_border", "لون حدود الصور المصغرة", "#e8ddd6"),
            color(f"{p}card", "لون البطاقات", "#ffffff"),
            color(f"{p}border", "لون الحدود", "#e8ddd6"),
            color(f"{p}button_bg", "خلفية الأزرار", "#8b5e4b"),
            color(f"{p}button_color", "لون نص الأزرار", "#ffffff"),
            number(f"{p}radius", "تدوير الحواف", 16, 0, 40, "px"),
            number(f"{p}shadow", "مستوى الظل", 1, 0, 3, ""),
            boolean(f"{p}full_width", "عرض كامل", False),
            static_title(f"{p}space_title", "المسافة أعلى وأسفل"),
            number(f"{p}space_desktop", "الكمبيوتر", 48, 0, 250, "px"),
            number(f"{p}space_mobile", "الجوال", 28, 0, 120, "px"),
        ],
    )


def build_aem():
    p = "aem_"

    def detail(
        name_ar,
        name_en,
        *,
        x=50,
        y=50,
        side="auto",
        img="",
        desc_ar="",
        desc_en="",
        stitch_ar="",
        stitch_en="",
        thread_ar="",
        thread_en="",
        method="hand",
        duration_ar="",
        duration_en="",
        extra_ar="",
        extra_en="",
        featured=False,
        badge_ar="",
        badge_en="",
        sort_order=1,
    ):
        return {
            "sort_order": sort_order,
            "name": {"ar": name_ar, "en": name_en},
            "desc": {"ar": desc_ar, "en": desc_en},
            "image": img,
            "alt": {"ar": name_ar, "en": name_en},
            "pos_x": x,
            "pos_y": y,
            "card_side": side,
            "stitch_type": {"ar": stitch_ar, "en": stitch_en},
            "thread": {"ar": thread_ar, "en": thread_en},
            "method": method,
            "duration": {"ar": duration_ar, "en": duration_en},
            "extra": {"ar": extra_ar, "en": extra_en},
            "btn_text": {"ar": "عرض المنتج", "en": "View product"},
            "show_number": True,
            "spot_color": "",
            "is_featured": featured,
            "badge": {"ar": badge_ar, "en": badge_en},
        }

    return component(
        "abaya-embroidery-map",
        "خريطة تطريز العباية",
        "sicon-map",
        IMG["abaya1"],
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان الرئيسي", "خريطة تطريز العباية", "Abaya Embroidery Map"),
            multilang(
                f"{p}desc",
                "الوصف",
                "اكتشفي تفاصيل التطريز والخياطة على خريطة تصميم فاخرة للعباية.",
                "Explore embroidery and stitching details on a luxury fashion map.",
                "textarea",
                "300",
            ),
            image(f"{p}image", "صورة العباية", IMG["abaya1"], required=True),
            multilang(f"{p}image_alt", "النص البديل للصورة", "عباية بتطريز فاخر", "Abaya with luxury embroidery"),
            variable_list(f"{p}product_url", "رابط المنتج الرئيسي"),
            multilang(f"{p}btn_text", "نص الزر الرئيسي", "عرض العباية", "View abaya"),
            boolean(f"{p}show_title", "إظهار العنوان", True),
            boolean(f"{p}show_desc", "إظهار الوصف", True),
            boolean(f"{p}show_btn", "إظهار الزر", True),
            dropdown_manual(
                f"{p}layout",
                "نوع التخطيط",
                [("خريطة ثلاثية الأعمدة", "map"), ("مركز مكثّف", "compact")],
                "map",
            ),
            dropdown_manual(
                f"{p}aspect",
                "نسبة أبعاد الصورة",
                [("3:4", "3/4"), ("2:3", "2/3"), ("4:5", "4/5"), ("1:1", "1/1")],
                "3/4",
            ),
            number(f"{p}max_width", "أقصى عرض للصورة", 420, 240, 720, "px"),
            boolean(f"{p}enable_pulse", "تفعيل حركة النقاط", True),
            boolean(f"{p}enable_lines", "تفعيل الخطوط", True),
            boolean(f"{p}show_numbers", "إظهار أرقام التفاصيل", True),
            boolean(f"{p}enable_detail_images", "تفعيل صور التفاصيل", True),
            boolean(f"{p}enable_zoom", "تفعيل التكبير", True),
            boolean(f"{p}open_new_tab", "فتح الروابط في نافذة جديدة", True),
            boolean(f"{p}animate", "تفعيل الحركات", True),
            static_title(f"{p}details_title", "تفاصيل التطريز"),
            collection(
                f"{p}details",
                "تفصيلة تطريز",
                [
                    number("sort_order", "ترتيب العرض", 1, 1, 40, ""),
                    multilang("name", "اسم التفصيلة", "تطريز الأكمام", "Sleeve embroidery"),
                    multilang("desc", "وصف التفصيلة", "", "", "textarea", "220"),
                    image("image", "صورة مقربة", ""),
                    multilang("alt", "النص البديل للصورة", "تفصيلة تطريز", "Embroidery detail"),
                    number("pos_x", "موضع X", 50, 0, 100, "%"),
                    number("pos_y", "موضع Y", 50, 0, 100, "%"),
                    dropdown_manual(
                        "card_side",
                        "مكان البطاقة",
                        [("تلقائي", "auto"), ("يمين", "right"), ("يسار", "left")],
                        "auto",
                    ),
                    multilang("stitch_type", "نوع التطريز", "", ""),
                    multilang("thread", "نوع الخيط أو الخامة", "", ""),
                    dropdown_manual(
                        "method",
                        "طريقة التنفيذ",
                        [
                            ("يدوي", "hand"),
                            ("آلي", "machine"),
                            ("يدوي وآلي", "both"),
                        ],
                        "hand",
                    ),
                    multilang("duration", "مدة التنفيذ", "", ""),
                    multilang("extra", "نص إضافي", "", "", "textarea", "160"),
                    variable_list("product_url", "رابط المنتج"),
                    multilang("btn_text", "نص الزر", "عرض المنتج", "View product"),
                    boolean("show_number", "إظهار رقم التفصيلة", True),
                    color("spot_color", "لون مخصص للنقطة", ""),
                    boolean("is_featured", "هل التفصيلة مميزة؟", False),
                    multilang("badge", "نص شارة التفصيلة", "تطريز يدوي", "Hand embroidery"),
                ],
                [
                    detail(
                        "تطريز الأكمام",
                        "Sleeve embroidery",
                        x=22,
                        y=28,
                        side="auto",
                        img=IMG["fabric"],
                        desc_ar="تطريز ناعم يمتد على الأكمام بخيوط حريرية.",
                        desc_en="Soft silk-thread embroidery along the sleeves.",
                        stitch_ar="غرزة سلسلة",
                        stitch_en="Chain stitch",
                        thread_ar="حرير",
                        thread_en="Silk",
                        method="hand",
                        featured=True,
                        badge_ar="تطريز يدوي",
                        badge_en="Hand embroidery",
                        sort_order=1,
                    ),
                    detail(
                        "تطريز الصدر",
                        "Chest embroidery",
                        x=50,
                        y=32,
                        side="auto",
                        img=IMG["abaya2"],
                        desc_ar="زخرفة مركزية على منطقة الصدر.",
                        desc_en="Central motif across the chest.",
                        stitch_ar="تطريز كوشينيل",
                        stitch_en="Couching",
                        thread_ar="خيط معدني",
                        thread_en="Metallic thread",
                        method="both",
                        featured=True,
                        badge_ar="تصميم حصري",
                        badge_en="Exclusive design",
                        sort_order=2,
                    ),
                    detail(
                        "تفاصيل الياقة",
                        "Collar details",
                        x=50,
                        y=14,
                        side="right",
                        img=IMG["abaya3"],
                        desc_ar="تشطيب دقيق حول الياقة.",
                        desc_en="Refined finishing around the collar.",
                        stitch_ar="غرزة ساتان",
                        stitch_en="Satin stitch",
                        method="machine",
                        sort_order=3,
                    ),
                    detail(
                        "زخرفة الحواف",
                        "Edge ornament",
                        x=78,
                        y=72,
                        side="auto",
                        img=IMG["care"],
                        desc_ar="زخرفة دقيقة على أطراف العباية.",
                        desc_en="Delicate ornament on the abaya edges.",
                        stitch_ar="حافة مزخرفة",
                        stitch_en="Ornamental edge",
                        thread_ar="خرز خفيف",
                        thread_en="Light beads",
                        method="hand",
                        sort_order=4,
                    ),
                    detail(
                        "الخياطة الجانبية",
                        "Side stitching",
                        x=30,
                        y=58,
                        side="left",
                        desc_ar="خياطة جانبية نظيفة تدعم انسيابية القصة.",
                        desc_en="Clean side stitching that supports the silhouette.",
                        stitch_ar="خياطة فرنسية",
                        stitch_en="French seam",
                        method="machine",
                        duration_ar="ساعتان",
                        duration_en="2 hours",
                        sort_order=5,
                    ),
                    detail(
                        "تفاصيل الظهر",
                        "Back details",
                        x=55,
                        y=48,
                        side="auto",
                        img=IMG["look"],
                        desc_ar="لمسة تطريز خفيفة على الظهر.",
                        desc_en="A light embroidery accent on the back.",
                        stitch_ar="غرزة نبتة",
                        stitch_en="Stem stitch",
                        method="hand",
                        badge_ar="تفصيل مميز",
                        badge_en="Signature detail",
                        sort_order=6,
                    ),
                ],
                0,
                24,
                False,
            ),
            static_title(f"{p}design_title", "إعدادات التصميم"),
            color(f"{p}bg", "لون خلفية القسم", "#faf7f5"),
            color(f"{p}stage_bg", "لون خلفية مساحة الصورة", "#f3ece7"),
            color(f"{p}card", "لون البطاقات", "#ffffff"),
            color(f"{p}text", "لون النص", "#2b211c"),
            color(f"{p}muted", "لون النص الثانوي", "#7a6a62"),
            color(f"{p}accent", "اللون الرئيسي", "#8b5e4b"),
            color(f"{p}spot_color", "لون النقاط", "#8b5e4b"),
            color(f"{p}line_color", "لون الخطوط", "#c4a99a"),
            color(f"{p}active_color", "لون الحالة النشطة", "#8b5e4b"),
            color(f"{p}card_border", "لون حدود البطاقات", "#e8ddd6"),
            color(f"{p}border", "لون الحدود", "#e8ddd6"),
            color(f"{p}button_bg", "خلفية الأزرار", "#8b5e4b"),
            color(f"{p}button_color", "لون نص الأزرار", "#ffffff"),
            number(f"{p}radius", "تدوير الحواف", 16, 0, 40, "px"),
            number(f"{p}shadow", "مستوى الظل", 1, 0, 3, ""),
            boolean(f"{p}full_width", "عرض كامل أو داخل Container", False),
            static_title(f"{p}space_title", "المسافة أعلى وأسفل العنصر"),
            number(f"{p}space_desktop", "الكمبيوتر", 48, 0, 250, "px"),
            number(f"{p}space_mobile", "الجوال", 28, 0, 120, "px"),
        ],
    )


def build_components():
    return [
        build_alc(),
        build_aca(),
        build_afl(),
        build_asd(),
        build_ass(),
        build_cr(),
        build_vab(),
        build_acm(),
        build_alb(),
        build_acfg(),
        build_es(),
        build_sfr(),
        build_ip(),
        build_amm(),
        build_als(),
        build_aem(),
    ]


def count_fields(fields):
    total = 0
    for field in fields:
        total += 1
        if field.get("type") == "collection" and field.get("fields"):
            total += len(field["fields"])
    return total


def validate(bundle):
    components = bundle["components"]
    names = [c["name"] for c in components]
    assert len(names) == len(set(names)), "duplicate component names"
    assert len(components) == 16, f"expected 16 components, got {len(components)}"

    for comp in components:
        assert comp.get("key"), f"missing component key: {comp['name']}"
        ids = [f["id"] for f in comp["fields"]]
        assert len(ids) == len(set(ids)), f"duplicate field ids in {comp['name']}"

    json.dumps(bundle)
    return True


def main():
    with BUNDLE_PATH.open(encoding="utf-8") as fh:
        bundle = json.load(fh)

    if not bundle.get("description", {}).get("ar"):
        bundle["description"] = {
            "ar": "عناصر واجهة متجر تفاعلية للأزياء والعبايات — حاسبات، مقارنات، ومصممات إطلالات.",
            "en": "Interactive fashion storefront elements for abayas — calculators, comparisons, and look builders.",
        }

    bundle["components"] = build_components()
    validate(bundle)

    with BUNDLE_PATH.open("w", encoding="utf-8") as fh:
        json.dump(bundle, fh, ensure_ascii=False, indent=4)
        fh.write("\n")

    total_fields = sum(count_fields(c["fields"]) for c in bundle["components"])
    print(f"Validation OK: {len(bundle['components'])} components, {total_fields} total fields (top-level + collection nested)")
    print(f"Written: {BUNDLE_PATH}")


if __name__ == "__main__":
    main()
