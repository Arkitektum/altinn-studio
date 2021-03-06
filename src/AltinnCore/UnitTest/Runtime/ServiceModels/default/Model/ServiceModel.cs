// <auto-generated/>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Serialization;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding;
namespace AltinnCoreServiceImplementation.tdd.xyz23
{
public class Skjema{
[Range(Int32.MinValue,Int32.MaxValue)]
    [XmlAttribute("skjemanummer")]
    [BindNever]
public decimal skjemanummer {get; set;} = 1243;
[Range(Int32.MinValue,Int32.MaxValue)]
    [XmlAttribute("spesifikasjonsnummer")]
    [BindNever]
public decimal spesifikasjonsnummer {get; set;} = 10702;
    [XmlAttribute("blankettnummer")]
    [BindNever]
public  string blankettnummer {get; set; } = "RF-1117";
    [XmlAttribute("tittel")]
    [BindNever]
public  string tittel {get; set; } = "Klage på likningen";
[Range(1,Int32.MaxValue)]
    [XmlAttribute("gruppeid")]
    [BindNever]
public decimal gruppeid {get; set;} = 5800;
    [XmlAttribute("etatid")]
public string etatid { get; set; }
    [XmlElement("Skattyterinfor-grp-5801")]
public Skattyterinforgrp5801 Skattyterinforgrp5801 { get; set; }
    [XmlElement("klage-grp-5805")]
public klagegrp5805 klagegrp5805 { get; set; }
}
public class Skattyterinforgrp5801{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("gruppeid")]
    [BindNever]
public decimal gruppeid {get; set;} = 5801;
    [XmlElement("info-grp-5802")]
public infogrp5802 infogrp5802 { get; set; }
    [XmlElement("Kontakt-grp-5803")]
public Kontaktgrp5803 Kontaktgrp5803 { get; set; }
    [XmlElement("klagefrist-grp-5804")]
public klagefristgrp5804 klagefristgrp5804 { get; set; }
}
public class infogrp5802{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("gruppeid")]
    [BindNever]
public decimal gruppeid {get; set;} = 5802;
    [XmlElement("OppgavegiverNavnPreutfylt-datadef-25795")]
public OppgavegiverNavnPreutfyltdatadef25795 OppgavegiverNavnPreutfyltdatadef25795 { get; set; }
    [XmlElement("OppgavegiverAdressePreutfylt-datadef-25796")]
public OppgavegiverAdressePreutfyltdatadef25796 OppgavegiverAdressePreutfyltdatadef25796 { get; set; }
    [XmlElement("OppgavegiverPostnummerPreutfylt-datadef-25797")]
public OppgavegiverPostnummerPreutfyltdatadef25797 OppgavegiverPostnummerPreutfyltdatadef25797 { get; set; }
    [XmlElement("OppgavegiverPoststedPreutfylt-datadef-25798")]
public OppgavegiverPoststedPreutfyltdatadef25798 OppgavegiverPoststedPreutfyltdatadef25798 { get; set; }
    [XmlElement("OppgavegiverFodselsnummer-datadef-26")]
public OppgavegiverFodselsnummerdatadef26 OppgavegiverFodselsnummerdatadef26 { get; set; }
    [XmlElement("EnhetOrganisasjonsnummer-datadef-18")]
public EnhetOrganisasjonsnummerdatadef18 EnhetOrganisasjonsnummerdatadef18 { get; set; }
    [XmlElement("EnhetKommunenummer-datadef-17")]
public EnhetKommunenummerdatadef17 EnhetKommunenummerdatadef17 { get; set; }
}
public class OppgavegiverNavnPreutfyltdatadef25795{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 25795;
[MinLength(1)]
[MaxLength(175)]
    [XmlText()]
public string value { get; set; }
}
public class OppgavegiverAdressePreutfyltdatadef25796{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 25796;
[MinLength(1)]
[MaxLength(500)]
    [XmlText()]
public string value { get; set; }
}
public class OppgavegiverPostnummerPreutfyltdatadef25797{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 25797;
[RegularExpression(@"[0-9]{4}")]
    [XmlText()]
public string value { get; set; }
}
public class OppgavegiverPoststedPreutfyltdatadef25798{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 25798;
[MinLength(1)]
[MaxLength(35)]
    [XmlText()]
public string value { get; set; }
}
public class OppgavegiverFodselsnummerdatadef26{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 26;
    [XmlText()]
public string value { get; set; }
}
public class EnhetOrganisasjonsnummerdatadef18{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 18;
    [XmlText()]
public string value { get; set; }
}
public class EnhetKommunenummerdatadef17{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 17;
[RegularExpression(@"[0-9]{4}")]
    [XmlText()]
public string value { get; set; }
}
public class Kontaktgrp5803{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("gruppeid")]
    [BindNever]
public decimal gruppeid {get; set;} = 5803;
    [XmlElement("KontaktpersonNavn-datadef-2")]
public KontaktpersonNavndatadef2 KontaktpersonNavndatadef2 { get; set; }
    [XmlElement("KontaktpersonAdresse-datadef-2751")]
public KontaktpersonAdressedatadef2751 KontaktpersonAdressedatadef2751 { get; set; }
    [XmlElement("KontaktpersonPostnummer-datadef-10441")]
public KontaktpersonPostnummerdatadef10441 KontaktpersonPostnummerdatadef10441 { get; set; }
    [XmlElement("KontaktpersonPoststed-datadef-10442")]
public KontaktpersonPoststeddatadef10442 KontaktpersonPoststeddatadef10442 { get; set; }
    [XmlElement("KontaktpersonEPost-datadef-27688")]
public KontaktpersonEPostdatadef27688 KontaktpersonEPostdatadef27688 { get; set; }
    [XmlElement("KontaktpersonTelefonnummer-datadef-3")]
public KontaktpersonTelefonnummerdatadef3 KontaktpersonTelefonnummerdatadef3 { get; set; }
}
public class KontaktpersonNavndatadef2{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 2;
[MinLength(1)]
[MaxLength(150)]
    [XmlText()]
public string value { get; set; }
}
public class KontaktpersonAdressedatadef2751{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 2751;
[MinLength(1)]
[MaxLength(105)]
    [XmlText()]
public string value { get; set; }
}
public class KontaktpersonPostnummerdatadef10441{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 10441;
[RegularExpression(@"[0-9]{4}")]
    [XmlText()]
public string value { get; set; }
}
public class KontaktpersonPoststeddatadef10442{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 10442;
[MinLength(1)]
[MaxLength(35)]
    [XmlText()]
public string value { get; set; }
}
public class KontaktpersonEPostdatadef27688{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 27688;
[MinLength(1)]
[MaxLength(45)]
    [XmlText()]
public string value { get; set; }
}
public class KontaktpersonTelefonnummerdatadef3{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 3;
[MinLength(1)]
[MaxLength(13)]
    [XmlText()]
public string value { get; set; }
}
public class klagefristgrp5804{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("gruppeid")]
    [BindNever]
public decimal gruppeid {get; set;} = 5804;
    [XmlElement("KlageGjeldendeInntektsar-datadef-25455")]
public KlageGjeldendeInntektsardatadef25455 KlageGjeldendeInntektsardatadef25455 { get; set; }
    [XmlElement("KlagemeldingSendtInnenKlagefrist-datadef-25454")]
public KlagemeldingSendtInnenKlagefristdatadef25454 KlagemeldingSendtInnenKlagefristdatadef25454 { get; set; }
    [XmlElement("KlageUtloptKlagefristBegrunnelse-datadef-25456")]
public KlageUtloptKlagefristBegrunnelsedatadef25456 KlageUtloptKlagefristBegrunnelsedatadef25456 { get; set; }
}
public class KlageGjeldendeInntektsardatadef25455{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 25455;
    [XmlText()]
public DateTime value { get; set; }
}
public class KlagemeldingSendtInnenKlagefristdatadef25454{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 25454;
[MinLength(1)]
[MaxLength(3)]
    [XmlText()]
public string value { get; set; }
}
public class KlageUtloptKlagefristBegrunnelsedatadef25456{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 25456;
[MinLength(1)]
[MaxLength(1000)]
    [XmlText()]
public string value { get; set; }
}
public class klagegrp5805{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("gruppeid")]
    [BindNever]
public decimal gruppeid {get; set;} = 5805;
    [XmlElement("spesifisering-grp-5836")]
public List<spesifiseringgrp5836> spesifiseringgrp5836 { get; set; }
}
public class spesifiseringgrp5836{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("gruppeid")]
    [BindNever]
public decimal gruppeid {get; set;} = 5836;
    [XmlElement("KlageSpesifisering-datadef-25457")]
public KlageSpesifiseringdatadef25457 KlageSpesifiseringdatadef25457 { get; set; }
    [XmlElement("KlageSpesifiseringg-datadef-12345")]
public KlageSpesifiseringgdatadef12345 KlageSpesifiseringgdatadef12345 { get; set; }
    [XmlElement("KlageSpesifiseringgg-datadef-23456")]
public KlageSpesifiseringggdatadef23456 KlageSpesifiseringggdatadef23456 { get; set; }
}
public class KlageSpesifiseringdatadef25457{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 25457;
[MinLength(1)]
[MaxLength(1000)]
    [XmlText()]
public string value { get; set; }
}
public class KlageSpesifiseringgdatadef12345{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 12345;
[MinLength(1)]
[MaxLength(1000)]
    [XmlText()]
public string value { get; set; }
}
public class KlageSpesifiseringggdatadef23456{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 23456;
[MinLength(1)]
[MaxLength(1000)]
    [XmlText()]
public string value { get; set; }
}
}
