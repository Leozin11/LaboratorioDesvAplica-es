import 'package:flutter/material.dart';
import 'screens/cliente_home.dart';
import 'screens/motorista_home.dart';

void main() {
  runApp(LogiTrackApp());
}

class LogiTrackApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'LogiTrack',
      theme: ThemeData(
        primarySwatch: Colors.indigo,
      ),
      home: SelecionaPerfilScreen(),
    );
  }
}

class SelecionaPerfilScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('LogiTrack - Escolha seu perfil')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              child: Text('Cliente'),
              onPressed: () {
                Navigator.push(context,
                  MaterialPageRoute(builder: (context) => ClienteHomeScreen()));
              },
            ),
            ElevatedButton(
              child: Text('Motorista'),
              onPressed: () {
                Navigator.push(context,
                  MaterialPageRoute(builder: (context) => MotoristaHomeScreen()));
              },
            ),
          ],
        ),
      ),
    );
  }
}
