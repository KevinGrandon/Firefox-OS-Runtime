user_pref("browser.manifestURL", "http://system.gaiamobile.org:8080/manifest.webapp");
user_pref("browser.homescreenURL", "http://system.gaiamobile.org:8080");
user_pref("network.http.max-connections-per-server", 15);
user_pref("ril.debugging.enabled", false);
user_pref("network.dns.localDomains", "gaiamobile.org,bluetooth.gaiamobile.org,browser.gaiamobile.org,calendar.gaiamobile.org,camera.gaiamobile.org,clock.gaiamobile.org,communications.gaiamobile.org,costcontrol.gaiamobile.org,email.gaiamobile.org,fm.gaiamobile.org,gallery.gaiamobile.org,homescreen.gaiamobile.org,keyboard.gaiamobile.org,music.gaiamobile.org,pdfjs.gaiamobile.org,settings.gaiamobile.org,sms.gaiamobile.org,system.gaiamobile.org,video.gaiamobile.org,wallpaper.gaiamobile.org,geoloc.gaiamobile.org,image-uploader.gaiamobile.org,membuster.gaiamobile.org,share-receiver.gaiamobile.org,template.gaiamobile.org,test-agent.gaiamobile.org,test-container.gaiamobile.org,test-receiver-1.gaiamobile.org,test-receiver-2.gaiamobile.org,test-receiver-inline.gaiamobile.org,test-sensors.gaiamobile.org,testpermission.gaiamobile.org,uitest.gaiamobile.org,crystalskull.gaiamobile.org,cubevid.gaiamobile.org,twittershare.gaiamobile.org");
user_pref("marionette.defaultPrefs.enabled", true);
user_pref("b2g.remote-js.enabled", true);
user_pref("b2g.remote-js.port", 4242);
user_pref("javascript.options.showInConsole", true);
user_pref("nglayout.debug.disable_xul_cache", true);
user_pref("browser.dom.window.dump.enabled", true);
user_pref("javascript.options.strict", true);
user_pref("dom.report_all_js_exceptions", true);
user_pref("nglayout.debug.disable_xul_fastload", true);
user_pref("extensions.autoDisableScopes", 0);
user_pref("browser.startup.homepage", "http://system.gaiamobile.org:8080");
user_pref("dom.mozBrowserFramesEnabled", true);
user_pref("b2g.ignoreXFrameOptions", true);
user_pref("dom.sms.enabled", true);
user_pref("dom.mozContacts.enabled", true);
user_pref("dom.mozSettings.enabled", true);
user_pref("device.storage.enabled", true);
user_pref("devtools.chrome.enabled", true);
user_pref("webgl.verbose", true);
user_pref("extensions.gaia.dir", "/Users/Kevin/workspace/gaia");
user_pref("extensions.gaia.domain", "gaiamobile.org");
user_pref("extensions.gaia.port", 8080);
user_pref("extensions.gaia.app_src_dirs", "apps test_apps showcase_apps");
user_pref("extensions.gaia.locales_debug_path", "locales");
user_pref("extensions.gaia.app_relative_path", "apps/bluetooth apps/browser apps/calendar apps/camera apps/clock apps/communications apps/costcontrol apps/email apps/fm apps/gallery apps/homescreen apps/keyboard apps/music apps/pdfjs apps/settings apps/sms apps/system apps/video apps/wallpaper test_apps/geoloc test_apps/image-uploader test_apps/membuster test_apps/share-receiver test_apps/template test_apps/test-agent test_apps/test-container test_apps/test-receiver-1 test_apps/test-receiver-2 test_apps/test-receiver-inline test_apps/test-sensors test_apps/testpermission test_apps/uitest showcase_apps/crystalskull showcase_apps/cubevid showcase_apps/twittershare");
user_pref("toolkit.identity.debug", true);
user_pref("marionette.defaultPrefs.enabled", true);
pref("geo.gps.supl_server", "test.supl.svc.ovi.com");
pref("geo.gps.supl_port", 7276);
pref("dom.payment.provider.0.name", "firefoxmarket");
pref("dom.payment.provider.0.description", "marketplace.firefox.com");
pref("dom.payment.provider.0.uri", "https://marketplace.firefox.com/mozpay/?req=");
pref("dom.payment.provider.0.type", "mozilla/payments/pay/v1");
pref("dom.payment.provider.0.requestMethod", "GET");
// Send these sites a custom user-agent. Bugs to remove each override after
// evangelism are included.
pref("general.useragent.override.youtube.com", "\(Mobile#(Android; Mobile"); // bug 827636
pref("general.useragent.override.accounts.google.com", "\(Mobile#(Android; Mobile"); // bug 805164
pref("general.useragent.override.maps.google.com", "\(Mobile#(Android; Mobile"); // bug 802981
pref("general.useragent.override.uol.com.br", "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19"); // bug 826330
pref("general.useragent.override.live.com", "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19"); // bug 826332
pref("general.useragent.override.globo.com", "\(Mobile#(Android; Mobile"); // bug 826335
pref("general.useragent.override.yahoo.com", "\(Mobile#(Android; Mobile"); // bug 826338
pref("general.useragent.override.mercadolivre.com.br", "\(Mobile#(Android; Mobile"); // bug 826342
pref("general.useragent.override.ig.com.br", "\(Mobile#(Android; Mobile"); // bug 826343
pref("general.useragent.override.abril.com.br", "\(Mobile#(Android; Mobile"); // bug 826344
pref("general.useragent.override.msn.com", "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19"); // bug 826347
pref("general.useragent.override.linkedin.com", "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19"); // bug 826348
pref("general.useragent.override.itau.com.br", "\(Mobile#(Android; Mobile"); // bug 826353
pref("general.useragent.override.tumblr.com", "\(Mobile#(Android; Mobile"); // bug 826361
pref("general.useragent.override.4shared.com", "\(Mobile#(Android; Mobile"); // bug 826502
pref("general.useragent.override.orkut.com.br", "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19"); // bug 826504
pref("general.useragent.override.r7.com", "\(Mobile#(Android; Mobile"); // bug 826510
pref("general.useragent.override.amazon.com", "\(Mobile#(Android; Mobile"); // bug 826512
pref("general.useragent.override.estadao.com.br", "\(Mobile#(Android; Mobile"); // bug 826514
pref("general.useragent.override.letras.mus.br", "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19"); // bug 826517
pref("general.useragent.override.bb.com.br", "\(Mobile#(Android; Mobile"); // bug 826711
pref("general.useragent.override.orkut.com", "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19"); // bug 826712
pref("general.useragent.override.noticias.uol.com.br", "\(Mobile#(Android; Mobile"); // bug 826715
pref("general.useragent.override.olx.com.br", "\(Mobile#(Android; Mobile"); // bug 826720
pref("general.useragent.override.bancobrasil.com.br", "\(Mobile#(Android; Mobile"); // bug 826736
pref("general.useragent.override.techtudo.com.br", "\(Mobile#(Android; Mobile"); // bug 826845
pref("general.useragent.override.clickjogos.uol.com.br", "\(Mobile#(Android; Mobile"); // bug 826949
pref("general.useragent.override.ebay.com", "\(Mobile#(Android; Mobile");// bug 826958
pref("general.useragent.override.bing.com", "\(Mobile#(Android; Mobile"); // bug 827622
pref("general.useragent.override.tam.com.br", "\(Mobile#(Android; Mobile"); // bug 827623
pref("general.useragent.override.pontofrio.com.br", "\(Mobile#(Android; Mobile"); // bug 827624
pref("general.useragent.override.pagseguro.uol.com.br", "\(Mobile#(Android; Mobile"); // bug 827625
pref("general.useragent.override.magazineluiza.com.br", "\(Mobile#(Android; Mobile"); // bug 827626
pref("general.useragent.override.bol.uol.com.br", "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19"); // bug 827627
pref("general.useragent.override.groupon.com.br", "\(Mobile#(Android; Mobile"); // bug 827628
pref("general.useragent.override.vagalume.com.br", "\(Mobile#(Android; Mobile"); // bug 827630
pref("general.useragent.override.climatempo.com.br", "\(Mobile#(Android; Mobile"); // bug 827631
pref("general.useragent.override.tecmundo.com.br", "\(Mobile#(Android; Mobile"); // bug 827632
pref("general.useragent.override.hao123.com", "\(Mobile#(Android; Mobile"); // bug 827633
pref("general.useragent.override.imdb.com", "\(Mobile#(Android; Mobile"); // bug 827634
pref("general.useragent.override.lancenet.com.br", "\(Mobile#(Android; Mobile"); // bug 827576
pref("general.useragent.override.webmotors.com.br", "\(Mobile#(Android; Mobile"); // bug 827573
pref("general.useragent.override.mercadolibre.com.co", "\(Mobile#(Android; Mobile"); // bug 827661
pref("general.useragent.override.elespectador.com", "\(Mobile#(Android; Mobile"); // bug 827664
pref("general.useragent.override.slideshare.net", "\(Mobile#(Android; Mobile"); // bug 827666
pref("general.useragent.override.scribd.com", "\(Mobile#(Android; Mobile"); // bug 827668
pref("general.useragent.override.elpais.com.co", "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19"); // bug 827670
pref("general.useragent.override.olx.com.co", "\(Mobile#(Android; Mobile"); // bug 827672
pref("general.useragent.override.avianca.com", "\(Mobile#(Android; Mobile"); // bug 827674
pref("general.useragent.override.marca.com", "\(Mobile#(Android; Mobile"); // bug 827678
pref("general.useragent.override.wp.pl", "\(Mobile#(Android; Mobile"); // bug 828351
pref("general.useragent.override.gazeta.pl", "\(Mobile#(Android; Mobile"); // bug 828354
pref("general.useragent.override.o2.pl", "\(Mobile#(Android; Mobile"); // bug 828356
pref("general.useragent.override.ceneo.pl", "\(Mobile#(Android; Mobile"); // bug 828358
pref("general.useragent.override.sport.pl", "\(Mobile#(Android; Mobile"); // bug 828360
pref("general.useragent.override.tvn24.pl", "\(Mobile#(Android; Mobile"); // bug 828362
pref("general.useragent.override.nk.pl", "\(Mobile#(Android; Mobile"); // bug 828364
pref("general.useragent.override.wyborcza.biz", "\(Mobile#(Android; Mobile"); // bug 828366
pref("general.useragent.override.money.pl", "\(Mobile#(Android; Mobile"); // bug 828369
pref("general.useragent.override.ingbank.pl", "\(Mobile#(Android; Mobile"); // bug 828371
pref("general.useragent.override.tablica.pl", "\(Mobile#(Android; Mobile"); // bug 828374
pref("general.useragent.override.plotek.pl", "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19"); // bug 828376
pref("general.useragent.override.wyborcza.pl", "\(Mobile#(Android; Mobile"); // bug 828378
pref("general.useragent.override.deser.pl", "\(Mobile#(Android; Mobile"); // bug 828380
pref("general.useragent.override.as.com", "\(Mobile#(Android; Mobile"); // bug 828383
pref("general.useragent.override.ebay.es", "\(Mobile#(Android; Mobile"); // bug 828386
pref("general.useragent.override.amazon.es", "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19"); // bug 828388
pref("general.useragent.override.20minutos.es", "\(Mobile#(Android; Mobile"); // bug 828390
pref("general.useragent.override.infojobs.net", "\(Mobile#(Android; Mobile"); // bug 828392
pref("general.useragent.override.vimeo.com", "\(Mobile#(Android; Mobile"); // bug 828394
pref("general.useragent.override.elconfidencial.com", "\(Mobile#(Android; Mobile"); // bug 828397
pref("general.useragent.override.antena3.com", "\(Mobile#(Android; Mobile"); // bug 828399
pref("general.useragent.override.ingdirect.es", "\(Mobile#(Android; Mobile"); // bug 828401
pref("general.useragent.override.fotocasa.es", "\(Mobile#(Android; Mobile"); // bug 828403
pref("general.useragent.override.orange.es", "\(Mobile#(Android; Mobile"); // bug 828406
pref("general.useragent.override.amazon.co.uk", "\(Mobile#(Android; Mobile"); // bug 828412
pref("general.useragent.override.paginasamarillas.es", "\(Mobile#(Android; Mobile"); // bug 828414
pref("general.useragent.override.loteriasyapuestas.es", "\(Mobile#(Android; Mobile"); // bug 828416
pref("general.useragent.override.bbva.es", "\(Mobile#(Android; Mobile"); // bug 828418
pref("general.useragent.override.booking.com", "\(Mobile#(Android; Mobile"); // bug 828420
pref("general.useragent.override.publico.es", "\(Mobile#(Android; Mobile"); // bug 828422
pref("general.useragent.override.mercadolibre.com.ve", "\(Mobile#(Android; Mobile"); // bug 828425
pref("general.useragent.override.lapatilla.com", "\(Mobile#(Android; Mobile"); // bug 828428
pref("general.useragent.override.meridiano.com.ve", "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19"); // bug 828430
pref("general.useragent.override.espn.go.com", "\(Mobile#(Android; Mobile"); // bug 828431
pref("general.useragent.override.olx.com.ve", "\(Mobile#(Android; Mobile"); // bug 828433
pref("general.useragent.override.rincondelvago.com", "\(Mobile#(Android; Mobile"); // bug 828435
pref("general.useragent.override.avn.info.ve", "\(Mobile#(Android; Mobile"); // bug 828437
pref("general.useragent.override.movistar.com.ve", "\(Mobile#(Android; Mobile"); // bug 828439
pref("general.useragent.override.laverdad.com", "\(Mobile#(Android; Mobile"); // bug 828441
pref("general.useragent.override.despegar.com.ve", "\(Mobile#(Android; Mobile"); // bug 828443
pref("general.useragent.override.bumeran.com.ve", "\(Mobile#(Android; Mobile"); // bug 828445
pref("general.useragent.override.petardas.com", "\(Mobile#(Android; Mobile"); // bug 828448
pref("general.useragent.override.mail.google.com", "\(Mobile#(Android; Mobile"); // bug 827869
pref("general.useragent.override.enfemenino.com", "\(Mobile#(Android; Mobile"); // bug 843109
pref("general.useragent.override.movil.bankinter.es", "\(Mobile#(Android; Mobile"); // bug 843112
pref("general.useragent.override.einforma.com", "\(Mobile#(Android; Mobile"); // bug 843114
pref("general.useragent.override.wwwhatsnew.com", "\(Mobile#(Android; Mobile"); // bug 843116
pref("general.useragent.override.askthebuilder.com", "\(Mobile#(Android; Mobile"); // bug 843119
pref("general.useragent.override.tor.com", "\(Mobile#(Android; Mobile"); // bug 843121
pref("general.useragent.override.maruccisports.com", "\(Mobile#(Android; Mobile"); // bug 843124
pref("general.useragent.override.es.playstation.com", "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19"); // bug 843126
pref("general.useragent.override.11870.com", "\(Mobile#(Android; Mobile"); // bug 843129
pref("general.useragent.override.iphonejuegosgratis.com", "\(Mobile#(Android; Mobile"); // bug 843200
pref("general.useragent.override.comunio.es", "\(Mobile#(Android; Mobile"); // bug 843132
pref("general.useragent.override.news.google.com", "\(Mobile#(Android; Mobile"); // bug 843134
pref("general.useragent.override.deviantart.com", "\(Mobile#(Android; Mobile"); // bug 843136
pref("general.useragent.override.nytimes.com", "\(Mobile#(Android; Mobile"); // bug 843137
pref("general.useragent.override.consumersearch.com", "\(Mobile#(Android; Mobile"); // bug 843139
pref("general.useragent.override.foodily.com", "\(Mobile#(Android; Mobile"); // bug 843141
pref("general.useragent.override.foxnewsinsider.com", "\(Mobile#(Android; Mobile"); // bug 843143
pref("general.useragent.override.edmunds.com", "\(Mobile#(Android; Mobile"); // bug 843146
pref("general.useragent.override.icanhas.cheezburger.com", "\(Mobile#(Android; Mobile"); // bug 843197
pref("general.useragent.override.arstechnica.com", "\(Mobile#(Android; Mobile"); // bug 843149
pref("general.useragent.override.citibank.com", "\(Mobile#(Android; Mobile"); // bug 843151
pref("general.useragent.override.games.com", "\(Mobile#(Android; Mobile"); // bug 843153
pref("general.useragent.override.nba.com", "\(Mobile#(Android; Mobile"); // bug 843154
pref("general.useragent.override.orbitz.com", "\(Mobile#(Android; Mobile"); // bug 843156
pref("general.useragent.override.starwoodhotels.com", "\(Mobile#(Android; Mobile"); // bug 843158
pref("general.useragent.override.ehow.com", "\(Mobile#(Android; Mobile"); // bug 843160
pref("general.useragent.override.urbanspoon.com", "\(Mobile#(Android; Mobile"); // bug 843162
pref("general.useragent.override.virginatlantic.com", "\(Mobile#(Android; Mobile"); // bug 843165
pref("general.useragent.override.cheaptickets.com", "\(Mobile#(Android; Mobile"); // bug 843168
pref("general.useragent.override.etsy.com", "\(Mobile#(Android; Mobile"); // bug 843170
pref("general.useragent.override.zimbio.com", "\(Mobile#(Android; Mobile"); // bug 843172
pref("general.useragent.override.thinkgeek.com", "\(Mobile#(Android; Mobile"); // bug 843174
pref("general.useragent.override.tylted.com", "\(Mobile#(Android; Mobile"); // bug 843176
pref("general.useragent.override.txt2nite.com", "\(Mobile#(Android; Mobile"); // bug 843178
pref("general.useragent.override.slashgear.com", "\(Mobile#(Android; Mobile"); // bug 843181
pref("general.useragent.override.thechive.com", "\(Mobile#(Android; Mobile"); // bug 843183
pref("general.useragent.override.chevrolet.com", "\(Mobile#(Android; Mobile"); // bug 843186
pref("general.useragent.override.deadline.com", "\(Mobile#(Android; Mobile"); // bug 848854