import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:gym_app/routine_template.dart';
import 'package:http/http.dart' as http;

Future<List<RoutineTemplate>> fetchRoutineTemplates() async {
  final response =
      await http.get(Uri.parse("http://localhost:3350/routines/templates"));

  if (response.statusCode == 200) {
    final List<dynamic> body = jsonDecode(response.body);
    return body.map((dynamic item) => RoutineTemplate.fromJson(item)).toList();
  } else {
    throw Exception("Failed to load routine templates");
  }
}

class RoutineList extends StatelessWidget {
  RoutineList({super.key});

  late final Future<List<RoutineTemplate>> futureRoutineTemplates =
      fetchRoutineTemplates();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: FutureBuilder<List<RoutineTemplate>>(
            future: futureRoutineTemplates,
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                return ListView(
                    children: snapshot.data!
                        .map((routineTemplate) => ListTile(
                              title: Text(routineTemplate.title),
                              subtitle: Text(routineTemplate.description ?? ""),
                            ))
                        .toList());
              } else if (snapshot.hasError) {
                return Center(
                  child: Padding(
                      padding: const EdgeInsets.fromLTRB(30, 0, 30, 0),
                      child: Text('${snapshot.error}',
                          textAlign: TextAlign.justify)),
                );
              }

              return const CircularProgressIndicator();
            }));
  }
}
